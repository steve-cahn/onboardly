import toast from "react-hot-toast";

export default function StepOneForm({ data, setData, onNext }: any) {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.email || !data.password) return toast.error("Email and password required.");
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password, progress: 2 }),
    });
    const u = await res.json();
    localStorage.setItem("rvs_email", u.email);
    onNext(u);
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <label>Email Address</label>
      <input
        type="email"
        value={data.email}
        placeholder="you@example.com"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <label>Password</label>
      <input
        type="password"
        value={data.password}
        placeholder="••••••••"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button type="submit" className="primary large">
        Continue to Step 2 →
      </button>
    </form>
  );
}
