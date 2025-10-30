"use client";

import { useUsersData } from "./components/useUsersData";
import DataHeader from "./components/DataHeader";
import DataTable from "./components/DataTable";
import "../styles/data.css";


export default function DataPage() {
  const { rows, loading, reload } = useUsersData();

  return (
    <div className="card">
      <DataHeader onReload={reload} />
      {loading ? <p>Loading…</p> : <DataTable rows={rows} />}
    </div>
  );
}
