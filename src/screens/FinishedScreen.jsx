import SuitGlyphs from "../components/SuitGlyphs";
import RoundHistory from "../components/RoundHistory";
import { LanguageSwitcher } from "./SetupScreen";

export default function FinishedScreen({
  lang, setLang,
  teamAName, teamBName,
  totals, winner,
  rounds,
  newGame,
  styles, t,
}) {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={{ ...styles.header, position: "relative" }}>
          <LanguageSwitcher lang={lang} onSwitch={setLang} styles={styles} />
          <h1 style={styles.title}>{t.appTitle}</h1>
          <SuitGlyphs style={styles.suitRow} />
        </div>

        <div style={styles.card}>
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
            <div style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.15em", color: "#8B3A2C", fontSize: "0.85rem", textTransform: "uppercase" }}>
              {t.gameOver}
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1B3A2F", marginTop: "6px" }}>
              {winner === "tie" ? t.itsATie : t.wins(winner)}
            </div>
          </div>

          <div style={styles.ledger}>
            <div style={{ ...styles.ledgerCol, ...styles.ledgerColA }}>
              <div style={styles.teamName}>{teamAName}</div>
              <div style={styles.teamScore}>{totals.a}</div>
            </div>
            <div style={{ ...styles.ledgerCol, ...styles.ledgerColB }}>
              <div style={styles.teamName}>{teamBName}</div>
              <div style={styles.teamScore}>{totals.b}</div>
            </div>
          </div>
        </div>

        <RoundHistory rounds={rounds} teamAName={teamAName} teamBName={teamBName} styles={styles} t={t} />

        <button style={{ ...styles.btn, marginTop: "12px" }} onClick={newGame}>
          {t.newGame}
        </button>
      </div>
    </div>
  );
}