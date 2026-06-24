import SuitGlyphs from "../components/SuitGlyphs";
import TRANSLATIONS from "../translations";

export default function SetupScreen({
  lang, setLang,
  teamAName, setTeamAName,
  teamBName, setTeamBName,
  target, setTarget,
  savedGameAvailable,
  resumeSavedGame, clearSavedGame,
  startGame,
  styles, t,
}) {
  function switchLang(newLang) {
    setLang(newLang);
    setTeamAName(TRANSLATIONS[newLang].defaultTeamA);
    setTeamBName(TRANSLATIONS[newLang].defaultTeamB);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={{ ...styles.header, position: "relative" }}>
          <LanguageSwitcher lang={lang} onSwitch={switchLang} styles={styles} />
          <h1 style={styles.title}>{t.appTitle}</h1>
          <SuitGlyphs style={styles.suitRow} />
          <div style={styles.subtitle}>{t.appSubtitle}</div>
        </div>

        {savedGameAvailable && (
          <div style={{ ...styles.card, borderColor: "#1B3A2F", background: "#eef2ea" }}>
            <div style={{ fontWeight: 700, color: "#1B3A2F", marginBottom: "6px" }}>{t.savedGameTitle}</div>
            <div style={{ fontSize: "0.88rem", color: "#5a523f", marginBottom: "14px" }}>{t.savedGameDesc}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button style={styles.btn} onClick={resumeSavedGame}>{t.resumeGame}</button>
              <button style={styles.btnSecondary} onClick={clearSavedGame}>{t.discardGame}</button>
            </div>
          </div>
        )}

        <div style={styles.card}>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>{t.teamALabel}</label>
              <input
                style={styles.input}
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value || t.defaultTeamA)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div>
              <label style={styles.label}>{t.teamBLabel}</label>
              <input
                style={styles.input}
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value || t.defaultTeamB)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <div>
            <label style={styles.label}>{t.targetLabel}</label>
            <input
              style={styles.input}
              type="number"
              min={51}
              step={10}
              value={target}
              onChange={(e) => setTarget(Number(e.target.value) || 301)}
              onFocus={(e) => e.target.select()}
            />
            <div style={styles.hint}>{t.targetHint}</div>
          </div>
        </div>

        <button style={styles.btn} onClick={startGame}>{t.dealFirstRound}</button>
      </div>
    </div>
  );
}

export function LanguageSwitcher({ lang, onSwitch, styles }) {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, display: "flex", gap: "6px" }}>
      <button
        onClick={() => onSwitch("cy")}
        title="Κυπριακά"
        style={{ background: "none", border: lang === "cy" ? "2px solid #1B3A2F" : "2px solid transparent", borderRadius: "4px", cursor: "pointer", padding: "2px", lineHeight: 1 }}
      >
        <img src="https://flagcdn.com/24x18/cy.png" alt="Κυπριακά" width="24" height="18" />
      </button>
      <button
        onClick={() => onSwitch("en")}
        title="English"
        style={{ background: "none", border: lang === "en" ? "2px solid #1B3A2F" : "2px solid transparent", borderRadius: "4px", cursor: "pointer", padding: "2px", lineHeight: 1 }}
      >
        <img src="https://flagcdn.com/24x18/gb.png" alt="English" width="24" height="18" />
      </button>
    </div>
  );
}