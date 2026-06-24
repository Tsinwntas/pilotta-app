import { SUITS } from "../constants";
import SuitGlyphs from "../components/SuitGlyphs";
import AnapodoTaunt from "../components/AnapodoTaunt";
import DeclarationsEditor from "../components/DeclarationsEditor";
import RoundHistory from "../components/RoundHistory";
import { LanguageSwitcher } from "./SetupScreen";

export default function PlayingScreen({
  lang, setLang,
  draft, setDraft,
  teamAName, teamBName,
  totals, target,
  rounds, error, saveError,
  setTeamATricks, setTeamBTricks,
  addDeclaration, updateDeclaration, removeDeclaration,
  submitRound, undoLastRound, exitToMenu,
  anapodoTaunt, dismissAnapodoTaunt,
  pendingRoundup, resolveRoundup,
  styles, t,
}) {
  const tricksSum = (Number(draft.teamATricks) || 0) + (Number(draft.teamBTricks) || 0);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={{ ...styles.header, position: "relative" }}>
          <LanguageSwitcher lang={lang} onSwitch={setLang} styles={styles} />
          <h1 style={styles.title}>{t.appTitle}</h1>
          <SuitGlyphs style={styles.suitRow} />
        </div>

        {/* Scoreboard */}
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
        <div style={{ textAlign: "center", fontFamily: "'Courier New', monospace", fontSize: "0.75rem", color: "#8a7d5e", marginBottom: "24px", letterSpacing: "0.1em" }}>
          {t.playingTo(target, draft.num)}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {/* Round entry form */}
        <div style={styles.card}>
          {/* Who bid */}
          <label style={styles.label}>{t.whoBid}</label>
          <div style={styles.toggleGroup}>
            <button style={styles.toggleBtn(draft.biddingTeam === "A")} onClick={() => setDraft({ ...draft, biddingTeam: "A" })}>{teamAName}</button>
            <button style={styles.toggleBtn(draft.biddingTeam === "B")} onClick={() => setDraft({ ...draft, biddingTeam: "B" })}>{teamBName}</button>
          </div>

          <div style={{ height: "16px" }} />

          {/* Bid amount & suit */}
          <label style={styles.label}>{t.bidLabel}</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: "10px" }}>
            <input
              style={styles.input}
              type="number"
              min={80}
              step={10}
              value={draft.bid}
              onChange={(e) => setDraft({ ...draft, bid: Number(e.target.value) || 80 })}
              onFocus={(e) => e.target.select()}
            />
            <select
              style={{ ...styles.input, textAlign: "center", fontSize: "1.3rem", fontWeight: 700, color: SUITS.find((s) => s.symbol === draft.bidSuit)?.color || "#2B2B2B" }}
              value={draft.bidSuit}
              onChange={(e) => setDraft({ ...draft, bidSuit: e.target.value })}
              aria-label="Trump suit"
            >
              {SUITS.map((s) => (
                <option key={s.symbol} value={s.symbol} style={{ color: s.color }}>{s.symbol}</option>
              ))}
            </select>
          </div>

          <div style={{ height: "18px" }} />

          {/* Closed / Open doubling */}
          <div style={{ marginBottom: "10px" }}>
            <label style={styles.label}>{t.doublingLabel}</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{ ...styles.checkboxRow, flex: 1, marginBottom: 0, borderColor: draft.kleisto && !draft.xanakleidoma ? "#1B3A2F" : "#c9b896", background: draft.kleisto && !draft.xanakleidoma ? "#e8f0ea" : "#FBF6EA", cursor: "pointer" }}
                onClick={() => setDraft({ ...draft, kleisto: !(draft.kleisto && !draft.xanakleidoma), xanakleidoma: false })}
              >
                <input type="checkbox" checked={draft.kleisto && !draft.xanakleidoma} onChange={() => {}} style={{ width: "16px", height: "16px" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.closedLabel}</div>
                  <div style={styles.hint}>{t.closedHint}</div>
                </div>
              </div>
              <div
                style={{ ...styles.checkboxRow, flex: 1, marginBottom: 0, borderColor: draft.xanakleidoma ? "#C9A24B" : "#c9b896", background: draft.xanakleidoma ? "#f5f0e0" : "#FBF6EA", cursor: "pointer" }}
                onClick={() => setDraft({ ...draft, xanakleidoma: !draft.xanakleidoma, kleisto: !draft.xanakleidoma ? true : draft.kleisto })}
              >
                <input type="checkbox" checked={draft.xanakleidoma} onChange={() => {}} style={{ width: "16px", height: "16px" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.openLabel}</div>
                  <div style={styles.hint}>{t.openHint}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "10px" }} />

          {/* Capot */}
          <div style={styles.checkboxRow} onClick={() => setDraft({ ...draft, capot: !draft.capot, anapodo: false })}>
            <input type="checkbox" checked={draft.capot} onChange={() => {}} style={{ width: "18px", height: "18px" }} />
            <div>
              <div style={{ fontWeight: 700 }}>{t.capotLabel}</div>
              <div style={styles.hint}>{t.capotHint}</div>
            </div>
          </div>

          <div style={{ height: "10px" }} />

          {/* Reverse / Anapodo */}
          <div style={{ ...styles.checkboxRow, borderColor: "#8B3A2C", cursor: "pointer" }} onClick={() => setDraft({ ...draft, anapodo: !draft.anapodo, capot: false })}>
            <input type="checkbox" checked={draft.anapodo} onChange={() => {}} style={{ width: "18px", height: "18px" }} />
            <div>
              <div style={{ fontWeight: 700, color: "#8B3A2C" }}>{t.reverseLabel}</div>
              <div style={styles.hint}>{(draft.kleisto || draft.xanakleidoma) ? t.reverseHintDoubled : t.reverseHint}</div>
            </div>
          </div>

          {/* Trick points */}
          {!draft.capot && !draft.anapodo && (
            <>
              <div style={styles.row}>
                <div>
                  <label style={styles.label}>{t.trickPointsA(teamAName)}</label>
                  <input
                    style={styles.input}
                    type="number"
                    min={0}
                    value={draft.teamATricks}
                    onChange={(e) => setTeamATricks(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="e.g. 92"
                  />
                </div>
                <div>
                  <label style={styles.label}>{t.trickPointsB(teamBName)}</label>
                  <input
                    style={styles.input}
                    type="number"
                    min={0}
                    value={draft.teamBTricks}
                    onChange={(e) => setTeamBTricks(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="e.g. 70"
                  />
                </div>
              </div>
              <div style={{ ...styles.hint, marginTop: "-8px", marginBottom: "16px" }}>
                {t.tricksHint}
                {draft.teamATricks !== "" && draft.teamBTricks !== "" && (
                  <span style={{ color: tricksSum === 162 ? "#1B3A2F" : "#8B3A2C", fontWeight: 700 }}>
                    {t.tricksTotal(tricksSum)}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Declarations */}
          <DeclarationsEditor
            teamName={teamAName}
            declarations={draft.teamADeclarations}
            onAdd={() => addDeclaration("A")}
            onUpdate={(id, patch) => updateDeclaration("A", id, patch)}
            onRemove={(id) => removeDeclaration("A", id)}
            styles={styles}
            t={t}
          />
          <DeclarationsEditor
            teamName={teamBName}
            declarations={draft.teamBDeclarations}
            onAdd={() => addDeclaration("B")}
            onUpdate={(id, patch) => updateDeclaration("B", id, patch)}
            onRemove={(id) => removeDeclaration("B", id)}
            styles={styles}
            t={t}
          />
          <div style={{ ...styles.hint, marginTop: "4px" }}>{t.declHint}</div>
        </div>

        {/* Actions */}
        <button style={styles.btn} onClick={submitRound}>{t.recordRound}</button>

        {rounds.length > 0 && (
          <button style={{ ...styles.btnSecondary, width: "100%", marginTop: "12px" }} onClick={undoLastRound}>
            {t.undoLastRound}
          </button>
        )}

        <RoundHistory rounds={rounds} teamAName={teamAName} teamBName={teamBName} styles={styles} t={t} />

        <button style={{ ...styles.btnSecondary, width: "100%", marginTop: "16px" }} onClick={exitToMenu}>
          {t.exitToMenu}
        </button>

        {saveError && <div style={{ ...styles.error, marginTop: "12px" }}>{saveError}</div>}

        {/* Overlays */}
        {anapodoTaunt && (
          <AnapodoTaunt team={anapodoTaunt.team} onDismiss={dismissAnapodoTaunt} t={t} />
        )}

        {pendingRoundup && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "24px" }}>
            <div style={{ background: "#FBF6EA", borderRadius: "6px", padding: "28px 24px", maxWidth: "360px", width: "100%", textAlign: "center", border: "2px solid #1B3A2F" }}>
              <div style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.12em", fontSize: "0.8rem", color: "#8B3A2C", textTransform: "uppercase", marginBottom: "10px" }}>
                {t.roundupTitle}
              </div>
              <div style={{ fontSize: "0.92rem", color: "#5a523f", marginBottom: "22px" }}>
                {t.roundupBody}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <button style={styles.btn} onClick={() => resolveRoundup(true)}>{teamAName}</button>
                <button style={styles.btn} onClick={() => resolveRoundup(false)}>{teamBName}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}