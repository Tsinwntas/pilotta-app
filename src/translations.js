const TRANSLATIONS = {
  en: {
    appTitle: "Pilotta",
    appSubtitle: "Cypriot Belote Scorepad",
    // Setup
    savedGameTitle: "You've got a game in progress",
    savedGameDesc: "Pick up where you left off, or clear it and start something new.",
    resumeGame: "Resume game",
    discardGame: "Discard it",
    teamALabel: "Team A name",
    teamBLabel: "Team B name",
    targetLabel: "Target score to win",
    targetHint: "Common choices: 151, 251, 301, 351. Set whatever your table plays to.",
    dealFirstRound: "Deal the first round →",
    defaultTeamA: "Us",
    defaultTeamB: "You",
    // Finished
    gameOver: "Game Over",
    itsATie: "It's a tie!",
    wins: (name) => `${name} wins!`,
    newGame: "New game",
    // Playing
    playingTo: (target, round) => `PLAYING TO ${target} · ROUND ${round}`,
    whoBid: "Who won the bid?",
    bidLabel: "Final bid & trump suit (minimum 80, multiples of 10)",
    doublingLabel: "Doubling (bidding mechanic)",
    closedLabel: "Closed ×2",
    closedHint: "Defenders doubled the bid",
    openLabel: "Open ×4",
    openHint: "Bidders redoubled",
    capotLabel: "Capot — bidding team won every trick",
    capotHint: "Bidder is credited 250 trick points (instead of entering tricks below) — but it still has to clear the bid.",
    reverseLabel: "Reverse — defending team won every trick",
    reverseHintDoubled: "Closed/Open scoring applies, but the taunt will still fire — because they deserve it.",
    reverseHint: "The bidder lost every trick to their own opponents. Bidder scores nothing — declarations don't count either. Defender scores bid + 250 + their own declarations. Shame is included free of charge.",
    trickPointsA: (name) => `${name} trick points`,
    trickPointsB: (name) => `${name} trick points`,
    tricksHint: "Include the +10 last-trick bonus in whichever team's total it belongs to. Fill in one side and the other fills itself in to make 162 — overwrite either one if you need to.",
    tricksTotal: (n) => ` Current total: ${n}`,
    declHint: "Only log declarations for the side with the highest meld — it cancels the other side's. Belote always counts for whoever holds it, so add it on top regardless.",
    recordRound: "Record round →",
    undoLastRound: "Undo last round",
    exitToMenu: "Exit to menu (progress is saved)",
    trickError: "Enter trick points for both teams (include the +10 last-trick bonus).",
    trickErrorNum: "Trick points must be valid numbers.",
    // Declarations
    declarationsLabel: (name) => `${name} declarations`,
    addDeclaration: "+ Add declaration",
    pts: "pts",
    // Declaration types
    declTypes: {
      belote: "Belote (K+Q trumps)",
      tierce: "Three in a row",
      quarte: "Four in a row",
      quinte: "Five in a row",
      square: "Four of a kind (A/K/Q/10)",
      nines: "Four nines",
      jacks: "Four jacks",
      custom: "Custom",
    },
    // Round history
    roundHistory: "Round history",
    summary: "SUMMARY",
    // Anapodo taunt
    reversed: "Reversed!",
    anapodoTitle: (team) => `What a loser, ${team}.`,
    anapodoBody: "You should feel ashamed! Bid the suit, lose every trick. Legendary.",
    continueShame: "Continue, in shame",
    // Roundup prompt
    roundupTitle: "Who gets the round-up?",
    roundupBody: "Both teams are equally close to rounding up. Pick who gets the extra point.",
    // Scoring summaries
    scoreSummaryReverse: (defender, bidder, bid, suit, defRaw, defScore) =>
      `Reverse! ${defender} took every trick against ${bidder}'s bid of ${bid} in ${suit}. Bidder scores nothing, declarations included; ${defender} scores (bid + 250 + declarations) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
    scoreSummaryMadeDoubled: (bidder, bid, suit, doubleLabel, multiplier, bidRaw, bidScore, defender) =>
      `${bidder} made the bid of ${bid} in ${suit}. [${doubleLabel}: bid×${multiplier}=${bid * multiplier}] Winner scores (160 + bid×${multiplier} + all declarations) ÷ 10 = ${bidRaw}÷10 → ${bidScore}; ${defender} scores 0.`,
    scoreSummaryMadeCapot: (bidder, suit, bidRaw, bidScore) =>
      `${bidder} took every trick in ${suit} — Capot! Bidder scores (tricks + declarations + bid) ÷ 10 = ${bidRaw}÷10 → ${bidScore}.`,
    scoreSummaryMade: (bidder, bid, suit, bidRaw, bidScore, defRaw, defScore) =>
      `${bidder} made the bid of ${bid} in ${suit}. Bidder scores (tricks + declarations + bid) ÷ 10 = ${bidRaw}÷10 → ${bidScore}; defender scores (tricks + declarations) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
    scoreSummaryFailedDoubled: (bidder, bid, suit, doubleLabel, multiplier, defender, defRaw, defScore) =>
      `${bidder} failed the bid of ${bid} in ${suit}. [${doubleLabel}: bid×${multiplier}=${bid * multiplier}] ${defender} wins and scores (160 + bid×${multiplier} + all declarations) ÷ 10 = ${defRaw}÷10 → ${defScore}; ${bidder} scores 0.`,
    scoreSummaryFailedCapot: (bidder, bid, suit, bidRaw, bidScore, defender, defRaw, defScore) =>
      `${bidder} took every trick in ${suit}, but Capot (250) + declarations still falls short of the bid of ${bid}. Bidder scores declarations ÷ 10 = ${bidRaw}÷10 → ${bidScore}; ${defender} scores (160 + bid + declarations) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
    scoreSummaryFailed: (bidder, bid, suit, bidRaw, bidScore, defender, defRaw, defScore) =>
      `${bidder} failed the bid of ${bid} in ${suit}. Bidder scores declarations ÷ 10 = ${bidRaw}÷10 → ${bidScore}; ${defender} scores (160 + bid + declarations) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
  },
  cy: {
    appTitle: "Πιλόττα",
    appSubtitle: "Μάρκαρισμα Πιλόττας",
    // Setup
    savedGameTitle: "Έσιεις παιχνίδιν εν εξελίξει",
    savedGameDesc: "Συνέχισε που απού έμεινες, ή πέταξέ το τζιαι άρκεψε καινούριον.",
    resumeGame: "Συνέχεια παιχνιδιού",
    discardGame: "Πέταμα του",
    teamALabel: "Όνομα ομάδας Α",
    teamBLabel: "Όνομα ομάδας Β",
    targetLabel: "Πόντοι για να κερδίσεις",
    targetHint: "Συνηθισμένες επιλογές: 151, 251, 301, 351. Βάλε ό,τι παίζει το τραπέζι σου.",
    dealFirstRound: "Μοίρασε τα χαρτιά →",
    defaultTeamA: "Εμείς",
    defaultTeamB: "Εσείς",
    // Finished
    gameOver: "Τέλος Παιχνιδιού",
    itsATie: "Ισοπαλία!",
    wins: (name) => `Κερδίσαν οι ${name}!`,
    newGame: "Νέο παιχνίδι",
    // Playing
    playingTo: (target, round) => `ΩΣ ${target} ΠΟΝTOΥΣ · ΓΥΡΟΣ ${round}`,
    whoBid: "Ποιος πήρε το άνοιγμα;",
    bidLabel: "Τελικό Μίλημα & κόζι (ελάχιστο 80, πολλαπλάσια του 10)",
    doublingLabel: "Κλείσιμο",
    closedLabel: "Κλειστό ×2",
    closedHint: "Οι αντίπαλοι έκλεισαν το άνοιγμα",
    openLabel: "Ανοικτό ×4",
    openHint: "Οι μιλητές ξανάνοιξαν",
    capotLabel: "Καπό — η ομάδα με το μίλημα πήρε κάθε πάζα",
    capotHint: "Η ομάδα πιστώνεται 250 πόντους πάζα (αντί να βάλεις πάζα πιο κάτω) — αλλά πρέπει να φτάσει το άνοιγμα.",
    reverseLabel: "Ανάποδο — η αμυνόμενη ομάδα πήρε κάθε πάζα",
    reverseHintDoubled: "Ισχύει το σκορ Κλειστού/Ανοικτού, αλλά το πείραγμα θα βγει — γιατί το αξίζουν.",
    reverseHint: "Ο μιλητής έχασε κάθε πάζα. Δεν μαρκάρει τίποτα — ούτε οι δηλώσεις μετράν. Οι αντίπαλοι μαρκάρουν άνοιγμα + 250 + τις δηλώσεις τους. Η ντροπή μπαίνει δωρεάν.",
    trickPointsA: (name) => `Πόντοι Παζών ${name}`,
    trickPointsB: (name) => `Πόντοι Παζών ${name}`,
    tricksHint: "Βάλε το +10 της τελευταίας πάζας στο σύνολο της ομάδας που τη πήρε. Βάλε τη μια μεριά τζιαι η άλλη συμπληρώνεται αυτόματα στα 162 — άλλαξε την αν χρειαστεί.",
    tricksTotal: (n) => ` Τρέχον σύνολο: ${n}`,
    declHint: "Σημείωνε δηλώσεις μόνο για την ομάδα με τη μεγαλύτερη — ακυρώνει της άλλης. Η πιλόττα μετρά πάντα για όποιον την έχει, βάλτε το ξεχωριστά.",
    recordRound: "Καταχώρηση γύρου →",
    undoLastRound: "Αναίρεση τελευταίου γύρου",
    exitToMenu: "Έξοδος στο μενού (αποθηκεύεται)",
    trickError: "Βάλε πόντους παζών τζιαι για τις δύο ομάδες (με το +10 τελευταίου πάζα).",
    trickErrorNum: "Οι πόντοι πάζα πρέπει να είναι αριθμοί.",
    // Declarations
    declarationsLabel: (name) => `Δηλώσεις ${name}`,
    addDeclaration: "+ Προσθήκη δήλωσης",
    pts: "πόντοι",
    // Declaration types
    declTypes: {
      belote: "Πιλόττα (Ρήγας+Ντάμα κόζι)",
      tierce: "Τρία στη σειρά",
      quarte: "Τέσσερα στη σειρά",
      quinte: "Πέντε στη σειρά",
      square: "Τεσσάρι (Α/Ρ/Ντ/10)",
      nines: "Τέσσερα εννιάρκα",
      jacks: "Τέσσερεις φάντιες",
      custom: "Άλλο",
    },
    // Round history
    roundHistory: "Ιστορικό γύρων",
    summary: "ΠΕΡΙΛΗΨΗ",
    // Anapodo taunt
    reversed: "Ανάποδο!",
    anapodoTitle: (team) => `Ρε ${team}, τι έκαμες;!`,
    anapodoBody: "Έπρεπε να ντρέπεσαι! Πήρες άνοιγμα τζιαι έχασες κάθε πάζα. Θρυλικό.",
    continueShame: "Συνέχεια, με ντροπή",
    // Roundup prompt
    roundupTitle: "Ποιος παίρνει το στρογγυλό;",
    roundupBody: "Οι δύο ομάδες είναι εξίσου κοντά στο στρογγυλό. Επίλεξε ποια παίρνει τον έξτρα πόντο.",
    // Scoring summaries
    scoreSummaryReverse: (defender, bidder, bid, suit, defRaw, defScore) =>
      `Ανάποδο! Οι ${defender} πήραν κάθε πάζα ενάντια στο μίλημα ${bid} ${suit} των ${bidder}. Ο μιλητής μαρκάρει μηδέν· οι ${defender} μαρκάρουν (μίλημα + 250 + δηλώσεις) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
    scoreSummaryMadeDoubled: (bidder, bid, suit, doubleLabel, multiplier, bidRaw, bidScore, defender) =>
      `Οι ${bidder} πέρασαν το μίλημα ${bid} σε ${suit}. [${doubleLabel}: μίλημα×${multiplier}=${bid * multiplier}] Ο νικητής μαρκάρει (160 + μίλημα×${multiplier} + όλες οι δηλώσεις) ÷ 10 = ${bidRaw}÷10 → ${bidScore}· οι ${defender} μαρκάρουν 0.`,
    scoreSummaryMadeCapot: (bidder, suit, bidRaw, bidScore) =>
      `Οι ${bidder} πήραν κάθε πάζα σε ${suit} — Καπό! Μαρκάρουν (πάζα + δηλώσεις + μίλημα) ÷ 10 = ${bidRaw}÷10 → ${bidScore}.`,
    scoreSummaryMade: (bidder, bid, suit, bidRaw, bidScore, defRaw, defScore) =>
      `Οι ${bidder} πέρασαν το μίλημα ${bid} σε ${suit}. Μιλητής μαρκάρει (πάζα + δηλώσεις + μίλημα) ÷ 10 = ${bidRaw}÷10 → ${bidScore}· αντίπαλοι μαρκάρουν (πάζα + δηλώσεις) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
    scoreSummaryFailedDoubled: (bidder, bid, suit, doubleLabel, multiplier, defender, defRaw, defScore) =>
      `Οι ${bidder} έχασαν το μίλημα ${bid} σε ${suit}. [${doubleLabel}: μίλημα×${multiplier}=${bid * multiplier}] Οι ${defender} κερδίζουν τζιαι μαρκάρουν (160 + μίλημα×${multiplier} + όλες οι δηλώσεις) ÷ 10 = ${defRaw}÷10 → ${defScore}· οι ${bidder} μαρκάρουν 0.`,
    scoreSummaryFailedCapot: (bidder, bid, suit, bidRaw, bidScore, defender, defRaw, defScore) =>
      `Οι ${bidder} πήραν κάθε πάζα σε ${suit}, αλλά Καπό (250) + δηλώσεις δεν φτάνουν το μίλημα ${bid}. Μιλητής μαρκάρει δηλώσεις ÷ 10 = ${bidRaw}÷10 → ${bidScore}· οι ${defender} μαρκάρουν (160 + μίλημα + δηλώσεις) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
    scoreSummaryFailed: (bidder, bid, suit, bidRaw, bidScore, defender, defRaw, defScore) =>
      `Οι ${bidder} έχασαν το μίλημα ${bid} σε ${suit}. Μιλητής μαρκάρει δηλώσεις ÷ 10 = ${bidRaw}÷10 → ${bidScore}· οι ${defender} μαρκάρουν (160 + μίλημα + δηλώσεις) ÷ 10 = ${defRaw}÷10 → ${defScore}.`,
  },
};

export default TRANSLATIONS;