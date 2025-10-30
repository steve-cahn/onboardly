"use client";


import { useAdminConfig } from "./components/hooks/useAdminConfig";
import AdminHeader from "./components/AdminHeader";
import AdminStepCard from "./components/AdminStepCard";
import AdminFooter from "./components/AdminFooter";
import "../styles/admin.css";


export default function AdminConfigPage() {
  const { config, saving, toggle, save } = useAdminConfig();

  if (!config)
    return (
      <div className="container">
        <p>Loading configuration…</p>
      </div>
    );

  return (
    <div className="container fade-wrapper">
      <AdminHeader />
      <div className="admin-grid">
        {[2, 3].map((step) => (
          <AdminStepCard key={step} step={step as 2 | 3} config={config} toggle={toggle} />
        ))}
      </div>
      <AdminFooter saving={saving} onSave={save} />
    </div>
  );
}
