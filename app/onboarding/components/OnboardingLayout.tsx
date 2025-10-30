import OnboardingHeader from "./OnboardingHeader";

type Props = {
  children: React.ReactNode;
  fade: boolean;
};

export default function OnboardingLayout({ children, fade }: Props) {
  return (
    <div className={`container fade-wrapper ${fade ? "fade-out" : "fade-in"}`}>
      <div className="onboard-card">
        <OnboardingHeader />
        {children}
      </div>
    </div>
  );
}
