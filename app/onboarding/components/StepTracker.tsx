type Props = { step: number };

export default function StepTracker({ step }: Props) {
  const labels = ["Account", "Personal", "Details"];
  
  return (
    <div className="step-tracker">
      {[1, 2, 3].map((n) => (
        <div key={n} className={`step ${step === n ? "active" : step > n ? "done" : ""}`}>
          <div className="circle">{step > n ? "✓" : n}</div>
          <span>{labels[n - 1]}</span>
        </div>
      ))}
    </div>
  );
}
