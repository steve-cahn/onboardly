"use client";
import OnboardingLayout from "./components/OnboardingLayout";
import StepContainer from "./components/StepContainer";
import { useOnboarding } from "./hooks/useOnboarding";
import "../styles/onboarding.css";

export default function OnboardingPage() {
  const onboarding = useOnboarding();
  return (
    <OnboardingLayout fade={onboarding.fade}>
      <StepContainer {...onboarding} />
    </OnboardingLayout>
  );
}
