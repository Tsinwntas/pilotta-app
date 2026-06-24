export default function RoundHistory({ rounds, teamAName, teamBName, styles, t }) {
  if (rounds.length === 0) return null;

  return (
    <div style={{ ...styles.card, marginTop: "28px" }}>
      <label style={styles.label}>{t.roundHistory}</label>
      <div style={styles.historyRow}>
        <div style={styles.historyNum}>#</div>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", color: "#8a7d5e" }}>{t.summary}</div>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.7rem", color: "#8a7d5e", textAlign: "right" }}>{teamAName.slice(0, 8)}</div>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.7rem", color: "#8a7d5e", textAlign: "right" }}>{teamBName.slice(0, 8)}</div>
      </div>
      {rounds.map((r) => (
        <div key={r.num} style={styles.historyRow}>
          <div style={styles.historyNum}>{r.num}</div>
          <div>
            <div style={{ fontSize: "0.82rem", color: "#5a523f" }}>{r.result.summary}</div>
            {(r.result.declSummaryA || r.result.declSummaryB) && (
              <div style={{ fontSize: "0.74rem", color: "#a89770", marginTop: "2px", fontFamily: "'Courier New', monospace" }}>
                {r.result.declSummaryA && `${teamAName}: ${r.result.declSummaryA}`}
                {r.result.declSummaryA && r.result.declSummaryB ? " · " : ""}
                {r.result.declSummaryB && `${teamBName}: ${r.result.declSummaryB}`}
              </div>
            )}
          </div>
          <div style={styles.historyScore}>{r.result.teamAScore}</div>
          <div style={styles.historyScore}>{r.result.teamBScore}</div>
        </div>
      ))}
    </div>
  );
}
