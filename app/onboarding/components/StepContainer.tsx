"use client";
import toast from "react-hot-toast";
import StepTracker from "./StepTracker";
import StepOneForm from "./StepOneForm";
import StepForm from "./StepForm/StepForm";
import LogoutButton from "./LogoutButton";

export default function StepContainer({
  step,
  config,
  step2,
  step3,
  formData,
  setFormData,
  goBack,
  handleLogout,
  completeOnboarding,
  triggerFade,
  setUser,
  setStep,
}: any) {
  return (
    <>
      <StepTracker step={step} />

      {step === 1 && (
        <StepOneForm
          data={formData}
          setData={setFormData}
          onNext={(u) => {
            setUser(u);
            toast.success("Step 1 complete!");
            triggerFade(() => setStep(2));
          }}
        />
      )}

      {step === 2 && config && (
        <StepForm
          step={2}
          config={step2}
          data={formData}
          setData={setFormData}
          onBack={goBack}
          onNext={() => triggerFade(() => setStep(3))}
        />
      )}

      {step === 3 && config && (
        <StepForm
          step={3}
          config={step3}
          data={formData}
          setData={setFormData}
          onBack={goBack}
          onComplete={completeOnboarding}
        />
      )}

      {step !== 1 && <LogoutButton onLogout={handleLogout} />}
    </>
  );
}
