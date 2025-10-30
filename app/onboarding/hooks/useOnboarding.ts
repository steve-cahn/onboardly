"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Config = { step2: string[]; step3: string[] };
type User = {
    id: string;
    email: string;
    progress: number;
    aboutMe?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    birthdate?: string | null;
};

export function useOnboarding() {
    const router = useRouter();
    const [config, setConfig] = useState<Config | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [step, setStep] = useState(1);
    const [fade, setFade] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        aboutMe: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        birthdate: "",
    });

    // load admin config
    useEffect(() => {
        fetch("/api/config", { cache: "no-store" })
            .then(r => r.json())
            .then(setConfig)
            .catch(console.error);
    }, []);

    // load returning user
    useEffect(() => {
        const saved = localStorage.getItem("rvs_email");
        if (!saved) return;
        fetch(`/api/users?email=${encodeURIComponent(saved)}`, { cache: "no-store" })
            .then(r => r.json())
            .then((u: User | null) => {
                if (!u) return;
                setUser(u);
                setStep(u.progress ?? 1);
                setFormData(f => ({
                    ...f,
                    email: u.email,
                    aboutMe: u.aboutMe ?? "",
                    street: u.street ?? "",
                    city: u.city ?? "",
                    state: u.state ?? "",
                    zip: u.zip ?? "",
                    birthdate: u.birthdate ? u.birthdate.slice(0, 10) : "",
                }));
            })
            .catch(() => { });
    }, []);

    const step2 = useMemo(() => config?.step2 ?? [], [config]);
    const step3 = useMemo(() => config?.step3 ?? [], [config]);

    const triggerFade = (cb: () => void) => {
        setFade(true);
        setTimeout(() => {
            cb();
            setFade(false);
        }, 300);
    };

    async function goBack() {
        if (step <= 1) return;
        const newStep = step - 1;
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ email: formData.email, progress: newStep }),
        });
        toast("Moved back a step.", { icon: "↩️" });
        triggerFade(() => setStep(newStep));
    }

    function handleLogout() {
        localStorage.removeItem("rvs_email");
        setUser(null);
        setStep(1);
        setFormData({
            email: "",
            password: "",
            aboutMe: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            birthdate: "",
        });
    }

    function completeOnboarding() {
        toast.success("🎉 Onboarding complete!");
        handleLogout();
        router.push("/data");
    }

    return {
        config,
        user,
        step,
        fade,
        formData,
        setFormData,
        triggerFade,
        goBack,
        handleLogout,
        completeOnboarding,
        step2,
        step3,
        setUser,
        setStep,
    };
}
