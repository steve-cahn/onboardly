"use client";

import toast from "react-hot-toast";
import AboutMeField from "./fields/AboutMeField";
import AddressFields from "./fields/AddressFields";
import BirthdateField from "./fields/BirthdateField";

type Props = {
  step: 2 | 3;
  config: string[];
  data: any;
  setData: (fn: any) => void;
  onBack: () => void;
  onNext?: () => void;
  onComplete?: () => void;
};

export default function StepForm({
  step,
  config,
  data,
  setData,
  onBack,
  onNext,
  onComplete,
}: Props) {
  const isFinal = step === 3;

  async function handleSubmit() {
    const payload: any = { email: data.email, progress: step };

    if (config.includes("aboutMe")) payload.aboutMe = data.aboutMe;
    if (config.includes("address")) {
      payload.street = data.street;
      payload.city = data.city;
      payload.state = data.state;
      payload.zip = data.zip;
    }
    if (config.includes("birthdate")) payload.birthdate = data.birthdate || null;

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save data.");

      if (isFinal) {
        toast.success("🎉 Onboarding complete!");
        onComplete?.();
      } else {
        toast.success(`Step ${step} complete!`);
        onNext?.();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving onboarding data.");
    }
  }

  return (
    <div className="stack">
      <h2>{isFinal ? "Final Step" : `Step ${step}`}</h2>
      <p className="subtext">
        {isFinal ? "Review and complete your onboarding." : "Please fill out the following details."}
      </p>

      {config.includes("aboutMe") && <AboutMeField value={data.aboutMe} setData={setData} data={data} />}
      {config.includes("address") && <AddressFields data={data} setData={setData} />}
      {config.includes("birthdate") && <BirthdateField value={data.birthdate} setData={setData} data={data} />}

      <div className="button-row">
        <button onClick={onBack} className="secondary">
          ← Back
        </button>
        <button onClick={handleSubmit} className="primary large">
          {isFinal ? "Finish Onboarding" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
