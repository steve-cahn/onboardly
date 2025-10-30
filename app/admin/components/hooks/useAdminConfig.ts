"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Config = { step2: string[]; step3: string[] };

export function useAdminConfig() {
    const [config, setConfig] = useState<Config | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/config", { cache: "no-store" })
            .then((r) => r.json())
            .then(setConfig)
            .catch(console.error);
    }, []);

    function toggle(step: 2 | 3, id: string) {
        if (!config) return;

        const key = step === 2 ? "step2" : "step3";
        const otherKey = step === 2 ? "step3" : "step2";
        const current = [...config[key]];
        const other = [...config[otherKey]];

        let updatedCurrent = [...current];
        let updatedOther = [...other];

        if (current.includes(id)) {
            updatedCurrent = current.filter((x) => x !== id);
        } else {
            updatedCurrent.push(id);
            updatedOther = other.filter((x) => x !== id);
        }

        if (updatedCurrent.length === 0) {
            toast.error("Each step must have at least one component.");
            return;
        }

        setConfig({
            ...config,
            [key]: updatedCurrent,
            [otherKey]: updatedOther,
        });
    }

    async function save() {
        if (!config) return;

        if (config.step2.length === 0 || config.step3.length === 0) {
            toast.error("Each step must have at least one component before saving.");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch("/api/config", {
                method: "POST",
                body: JSON.stringify(config),
            });

            if (!res.ok) throw new Error("Failed to save configuration");
            toast.success("Configuration saved successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save configuration. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    return { config, saving, toggle, save };
}
