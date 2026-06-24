import { useState, useEffect, useMemo } from "react";
import { storageGet, storageSet, storageDelete } from "./storage";
import TRANSLATIONS from "./translations";
import { SAVE_KEY } from "./constants";
import { freshRound, sumDeclarations, describeDeclarations, newDeclaration } from "./utils";
import styles from "./styles";
import SetupScreen from "./screens/SetupScreen";
import FinishedScreen from "./screens/FinishedScreen";
import PlayingScreen from "./screens/PlayingScreen";

export default function PilottaScorer() {
  // ---------- Language ----------
  const [lang, setLang] = useState("cy");
  const t = TRANSLATIONS[lang];

  // ---------- Game state ----------
  const [stage, setStage] = useState("setup"); // "setup" | "playing" | "finished"
  const [teamAName, setTeamAName] = useState("Εμείς");
  const [teamBName, setTeamBName] = useState("Εσείς");
  const [target, setTarget] = useState(301);
  const [rounds, setRounds] = useState([]);
  const [draft, setDraft] = useState(freshRound(1));

  // ---------- UI state ----------
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [anapodoTaunt, setAnapodoTaunt] = useState(null); // { team, pendingGameOver, nextNum }
  const [pendingRoundup, setPendingRoundup] = useState(null); // { draft, result }
  const [hasLoadedSave, setHasLoadedSave] = useState(false);
  const [savedGameAvailable, setSavedGameAvailable] = useState(false);

  // ---------- Persistence ----------
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await storageGet(SAVE_KEY);
        if (!cancelled && result) setSavedGameAvailable(true);
      } catch {
        // No saved game or storage unavailable — start fresh.
      } finally {
        if (!cancelled) setHasLoadedSave(true);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hasLoadedSave) return;
    if (stage === "setup" && rounds.length === 0) return;
    async function save() {
      try {
        const payload = { stage, teamAName, teamBName, target, rounds, draft };
        await storageSet(SAVE_KEY, JSON.stringify(payload));
        setSaveError("");
      } catch {
        setSaveError("Couldn't save progress — if you close the app now, this game may not resume.");
      }
    }
    save();
  }, [hasLoadedSave, stage, teamAName, teamBName, target, rounds, draft]);

  async function resumeSavedGame() {
    try {
      const result = await storageGet(SAVE_KEY);
      if (result) {
        const payload = JSON.parse(result);
        setTeamAName(payload.teamAName ?? "Εμείς");
        setTeamBName(payload.teamBName ?? "Εσείς");
        setTarget(payload.target ?? 301);
        setRounds(payload.rounds ?? []);
        setDraft(payload.draft ?? freshRound((payload.rounds?.length || 0) + 1));
        setStage(payload.stage === "finished" ? "finished" : "playing");
      }
    } catch {
      setSaveError("Couldn't load the saved game.");
    }
  }

  async function clearSavedGame() {
    try { await storageDelete(SAVE_KEY); } catch { /* nothing to delete */ }
    setSavedGameAvailable(false);
  }

  // ---------- Derived values ----------
  const totals = useMemo(() => {
    return rounds.reduce((acc, r) => ({ a: acc.a + r.result.teamAScore, b: acc.b + r.result.teamBScore }), { a: 0, b: 0 });
  }, [rounds]);

  const winner = stage === "finished"
    ? totals.a === totals.b ? "tie" : totals.a > totals.b ? teamAName : teamBName
    : null;

  // ---------- Navigation ----------
  function startGame() { setStage("playing"); }

  function exitToMenu() {
    setStage("setup");
    setSavedGameAvailable(true);
  }

  function newGame() {
    clearSavedGame();
    setStage("setup");
    setRounds([]);
    setDraft(freshRound(1));
    setError("");
  }

  function resetDraft(num) {
    setDraft(freshRound(num));
    setError("");
  }

  // ---------- Draft editing helpers ----------
  function setTeamATricks(value) {
    if (value === "") { setDraft({ ...draft, teamATricks: "" }); return; }
    const n = Number(value);
    if (Number.isNaN(n)) { setDraft({ ...draft, teamATricks: value }); return; }
    setDraft({ ...draft, teamATricks: value, teamBTricks: String(Math.max(0, 162 - n)) });
  }

  function setTeamBTricks(value) {
    if (value === "") { setDraft({ ...draft, teamBTricks: "" }); return; }
    const n = Number(value);
    if (Number.isNaN(n)) { setDraft({ ...draft, teamBTricks: value }); return; }
    setDraft({ ...draft, teamBTricks: value, teamATricks: String(Math.max(0, 162 - n)) });
  }

  function addDeclaration(team) {
    const key = team === "A" ? "teamADeclarations" : "teamBDeclarations";
    setDraft({ ...draft, [key]: [...draft[key], newDeclaration()] });
  }

  function updateDeclaration(team, id, patch) {
    const key = team === "A" ? "teamADeclarations" : "teamBDeclarations";
    setDraft({ ...draft, [key]: draft[key].map((d) => (d.id === id ? { ...d, ...patch } : d)) });
  }

  function removeDeclaration(team, id) {
    const key = team === "A" ? "teamADeclarations" : "teamBDeclarations";
    setDraft({ ...draft, [key]: draft[key].filter((d) => d.id !== id) });
  }

  // ---------- Scoring ----------
  function computeResult(d) {
    const bidder = d.biddingTeam;
    const defender = bidder === "A" ? "B" : "A";
    const declA = sumDeclarations(d.teamADeclarations);
    const declB = sumDeclarations(d.teamBDeclarations);
    const bidderDecl = bidder === "A" ? declA : declB;
    const defenderDecl = bidder === "A" ? declB : declA;
    const allDecl = declA + declB;

    const bidderName = bidder === "A" ? teamAName : teamBName;
    const defenderName = defender === "A" ? teamAName : teamBName;

    // Ανάποδο (no doubling): defender took every trick
    if (d.anapodo && !d.kleisto && !d.xanakleidoma) {
      const defenderRaw = d.bid + 250 + defenderDecl;
      const defenderScore = Math.floor(defenderRaw / 10);
      const teamAScore = bidder === "A" ? 0 : defenderScore;
      const teamBScore = bidder === "B" ? 0 : defenderScore;
      return {
        teamAScore, teamBScore, anapodo: true,
        summary: t.scoreSummaryReverse(defenderName, bidderName, d.bid, d.bidSuit, defenderRaw, defenderScore),
        declSummaryA: describeDeclarations(d.teamADeclarations, t.declTypes),
        declSummaryB: describeDeclarations(d.teamBDeclarations, t.declTypes),
      };
    }

    const bidderTrick = d.capot ? 250 : Number(bidder === "A" ? d.teamATricks : d.teamBTricks) || 0;
    const defenderTrick = d.capot ? 0 : Number(bidder === "A" ? d.teamBTricks : d.teamATricks) || 0;

    // Bid check uses raw (pre-rounding) values
    const made = bidderTrick + bidderDecl >= d.bid;

    const multiplier = d.xanakleidoma ? 4 : d.kleisto ? 2 : 1;
    const doubleLabel = d.xanakleidoma ? t.openLabel : d.kleisto ? t.closedLabel : null;

    if (made) {
      const bidderRaw = multiplier > 1
        ? 160 + d.bid * multiplier + allDecl
        : bidderTrick + bidderDecl + d.bid;
      const defenderRaw = multiplier > 1 ? 0 : defenderTrick + defenderDecl;

      // Rounding only applies to normal (non-doubled, non-capot) wins
      let bidderScore, defenderScore, needsRoundupPrompt = false;
      if (multiplier === 1 && !d.capot) {
        const bidderDist = 10 - (bidderTrick % 10);
        const defenderDist = 10 - (defenderTrick % 10);
        if (bidderDist === defenderDist) {
          needsRoundupPrompt = true;
          bidderScore = Math.floor(bidderRaw / 10);
          defenderScore = Math.floor(defenderRaw / 10);
        } else if (bidderDist < defenderDist) {
          bidderScore = Math.floor(bidderRaw / 10) + 1;
          defenderScore = Math.floor(defenderRaw / 10);
        } else {
          bidderScore = Math.floor(bidderRaw / 10);
          defenderScore = Math.floor(defenderRaw / 10) + 1;
        }
      } else {
        bidderScore = Math.floor(bidderRaw / 10);
        defenderScore = Math.floor(defenderRaw / 10);
      }

      const teamAScore = bidder === "A" ? bidderScore : defenderScore;
      const teamBScore = bidder === "B" ? bidderScore : defenderScore;
      const summary = multiplier > 1
        ? t.scoreSummaryMadeDoubled(bidderName, d.bid, d.bidSuit, doubleLabel, multiplier, bidderRaw, bidderScore, defenderName)
        : d.capot
        ? t.scoreSummaryMadeCapot(bidderName, d.bidSuit, bidderRaw, bidderScore)
        : t.scoreSummaryMade(bidderName, d.bid, d.bidSuit, bidderRaw, bidderScore, defenderRaw, defenderScore);

      if (needsRoundupPrompt) {
        return {
          needsRoundupPrompt: true,
          baseTeamAScore: teamAScore,
          baseTeamBScore: teamBScore,
          summary,
          declSummaryA: describeDeclarations(d.teamADeclarations, t.declTypes),
          declSummaryB: describeDeclarations(d.teamBDeclarations, t.declTypes),
        };
      }

      return {
        teamAScore, teamBScore, summary,
        declSummaryA: describeDeclarations(d.teamADeclarations, t.declTypes),
        declSummaryB: describeDeclarations(d.teamBDeclarations, t.declTypes),
      };
    }

    // Bidder failed
    const bidderRaw = multiplier > 1 ? 0 : bidderDecl;
    const defenderRaw = multiplier > 1
      ? 160 + d.bid * multiplier + allDecl
      : 160 + d.bid + defenderDecl;
    const bidderScore = Math.floor(bidderRaw / 10);
    const defenderScore = Math.floor(defenderRaw / 10);
    const teamAScore = bidder === "A" ? bidderScore : defenderScore;
    const teamBScore = bidder === "B" ? bidderScore : defenderScore;
    const summary = multiplier > 1
      ? t.scoreSummaryFailedDoubled(bidderName, d.bid, d.bidSuit, doubleLabel, multiplier, defenderName, defenderRaw, defenderScore)
      : d.capot
      ? t.scoreSummaryFailedCapot(bidderName, d.bid, d.bidSuit, bidderRaw, bidderScore, defenderName, defenderRaw, defenderScore)
      : t.scoreSummaryFailed(bidderName, d.bid, d.bidSuit, bidderRaw, bidderScore, defenderName, defenderRaw, defenderScore);

    return {
      teamAScore, teamBScore, summary,
      declSummaryA: describeDeclarations(d.teamADeclarations, t.declTypes),
      declSummaryB: describeDeclarations(d.teamBDeclarations, t.declTypes),
    };
  }

  function submitRound() {
    setError("");
    const d = draft;

    if (!d.capot && !d.anapodo) {
      const trickA = Number(d.teamATricks);
      const trickB = Number(d.teamBTricks);
      if (d.teamATricks === "" || d.teamBTricks === "") { setError(t.trickError); return; }
      if (Number.isNaN(trickA) || Number.isNaN(trickB) || trickA < 0 || trickB < 0) { setError(t.trickErrorNum); return; }
      if (trickA + trickB !== 162) {
        setError(`Trick points should total 162 (including the 10-point last trick bonus). Currently: ${trickA + trickB}.`);
        return;
      }
    }

    const result = computeResult(d);
    if (result.needsRoundupPrompt) { setPendingRoundup({ draft: d, result }); return; }
    commitRound(d, result);
  }

  function commitRound(d, result) {
    const finishedRound = { ...d, resolved: true, result };
    const newRounds = [...rounds, finishedRound];
    setRounds(newRounds);

    const newTotalA = newRounds.reduce((s, r) => s + r.result.teamAScore, 0);
    const newTotalB = newRounds.reduce((s, r) => s + r.result.teamBScore, 0);
    const gameOver = newTotalA >= target || newTotalB >= target;

    if (d.anapodo) {
      setAnapodoTaunt({ team: d.biddingTeam === "A" ? teamAName : teamBName, pendingGameOver: gameOver, nextNum: d.num + 1 });
    } else if (gameOver) {
      setStage("finished");
    } else {
      resetDraft(d.num + 1);
    }
  }

  function resolveRoundup(giveToA) {
    if (!pendingRoundup) return;
    const { draft: d, result } = pendingRoundup;
    const finalResult = {
      ...result,
      needsRoundupPrompt: false,
      teamAScore: result.baseTeamAScore + (giveToA ? 1 : 0),
      teamBScore: result.baseTeamBScore + (giveToA ? 0 : 1),
    };
    setPendingRoundup(null);
    commitRound(d, finalResult);
  }

  function dismissAnapodoTaunt() {
    if (!anapodoTaunt) return;
    if (anapodoTaunt.pendingGameOver) { setStage("finished"); } else { resetDraft(anapodoTaunt.nextNum); }
    setAnapodoTaunt(null);
  }

  function undoLastRound() {
    if (rounds.length === 0) return;
    const last = rounds[rounds.length - 1];
    setRounds(rounds.slice(0, -1));
    setDraft({ ...last, resolved: false, result: null });
    setStage("playing");
    setError("");
  }

  // ---------- Shared props passed to all screens ----------
  const commonProps = { lang, setLang, teamAName, setTeamAName, teamBName, setTeamBName, styles, t };

  // ---------- Screen routing ----------
  if (stage === "setup") {
    return (
      <SetupScreen
        {...commonProps}
        target={target} setTarget={setTarget}
        savedGameAvailable={savedGameAvailable}
        resumeSavedGame={resumeSavedGame}
        clearSavedGame={clearSavedGame}
        startGame={startGame}
      />
    );
  }

  if (stage === "finished") {
    return (
      <FinishedScreen
        {...commonProps}
        totals={totals} winner={winner}
        rounds={rounds}
        newGame={newGame}
      />
    );
  }

  return (
    <PlayingScreen
      {...commonProps}
      draft={draft} setDraft={setDraft}
      totals={totals} target={target}
      rounds={rounds} error={error} saveError={saveError}
      setTeamATricks={setTeamATricks} setTeamBTricks={setTeamBTricks}
      addDeclaration={addDeclaration}
      updateDeclaration={updateDeclaration}
      removeDeclaration={removeDeclaration}
      submitRound={submitRound}
      undoLastRound={undoLastRound}
      exitToMenu={exitToMenu}
      anapodoTaunt={anapodoTaunt} dismissAnapodoTaunt={dismissAnapodoTaunt}
      pendingRoundup={pendingRoundup} resolveRoundup={resolveRoundup}
    />
  );
}
