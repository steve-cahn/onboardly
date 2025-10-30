const COMPONENTS = [
    { id: "aboutMe", label: "About Me", description: "Personal bio and introduction" },
    { id: "address", label: "Address", description: "Street, city, state, and zip code" },
    { id: "birthdate", label: "Birthdate", description: "Date of birth" },
  ];
  
  type Props = {
    step: 2 | 3;
    config: { step2: string[]; step3: string[] };
    toggle: (step: 2 | 3, id: string) => void;
  };
  
  export default function AdminStepCard({ step, config, toggle }: Props) {
    const stepKey = step === 2 ? "step2" : "step3";
    const selected = config[stepKey];
  
    return (
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="step-num">{step}</div>
          <div>
            <h2>Step {step} Components</h2>
            <p className="muted">
              {step === 2
                ? "Select fields for personal information"
                : "Select fields for additional details"}
            </p>
          </div>
        </div>
  
        <div className="admin-options">
          {COMPONENTS.map((c) => (
            <label
              key={c.id}
              className={`admin-option ${selected.includes(c.id) ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={selected.includes(c.id)}
                onChange={() => toggle(step, c.id)}
              />
              <div>
                <div className="option-label">{c.label}</div>
                <div className="option-desc">{c.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }
  