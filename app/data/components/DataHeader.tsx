"use client";

type Props = {
  onReload: () => void;
};

export default function DataHeader({ onReload }: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h1>Data</h1>
      <p className="help">Public table for testing. Reload this page to see updates.</p>
      <button onClick={onReload} style={{ marginTop: 12 }}>
        Refresh
      </button>
    </div>
  );
}
