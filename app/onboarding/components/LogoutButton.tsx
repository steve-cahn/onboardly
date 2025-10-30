export default function LogoutButton({ onLogout }: { onLogout: () => void }) {
    return (
      <div className="logout-container">
        <button onClick={onLogout} className="secondary">
          Logout
        </button>
      </div>
    );
  }
  