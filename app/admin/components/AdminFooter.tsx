type Props = {
    saving: boolean;
    onSave: () => void;
  };
  
  export default function AdminFooter({ saving, onSave }: Props) {
    return (
      <div className="admin-footer">
        <button onClick={onSave} className="primary large" disabled={saving}>
          {saving ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    );
  }
  