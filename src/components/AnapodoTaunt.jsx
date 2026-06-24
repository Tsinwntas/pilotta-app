export default function AnapodoTaunt({ team, onDismiss, t }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(43,43,43,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onDismiss}
    >
      <style>{`
        @keyframes anapodo-shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-6deg) scale(1.04); }
          30% { transform: rotate(5deg) scale(1.04); }
          45% { transform: rotate(-4deg) scale(1.02); }
          60% { transform: rotate(3deg) scale(1.02); }
          75% { transform: rotate(-2deg) scale(1.01); }
        }
        @keyframes anapodo-pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FBF6EA",
          border: "3px solid #8B3A2C",
          borderRadius: "6px",
          padding: "32px 28px",
          maxWidth: "360px",
          textAlign: "center",
          fontFamily: "'Iowan Old Style', Georgia, serif",
          animation: "anapodo-pop 0.35s ease-out",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "8px", animation: "anapodo-shake 0.6s ease-in-out 0.35s", display: "inline-block" }}>
          🙃
        </div>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B3A2C", marginBottom: "10px" }}>
          {t.reversed}
        </div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1B3A2F", marginBottom: "8px" }}>
          {t.anapodoTitle(team)}
        </div>
        <div style={{ fontSize: "1rem", color: "#5a523f", marginBottom: "22px" }}>
          {t.anapodoBody}
        </div>
        <button
          onClick={onDismiss}
          style={{
            background: "#1B3A2F",
            color: "#F2E8D5",
            border: "none",
            borderRadius: "3px",
            padding: "11px 24px",
            fontSize: "0.85rem",
            fontWeight: 700,
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            cursor: "pointer",
          }}
        >
          {t.continueShame}
        </button>
      </div>
    </div>
  );
}
