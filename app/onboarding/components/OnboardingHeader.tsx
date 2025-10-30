export default function OnboardingHeader() {
    return (
      <>
        <h1 className="onboard-title">Welcome to Onboarding</h1>
        <p className="onboard-sub">
          Complete this 3-step wizard to get started. Steps 2 & 3 are customizable via{" "}
          <a href="/admin">Admin</a>.
        </p>
      </>
    );
  }
  