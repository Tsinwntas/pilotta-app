export const SUITS = [
  { symbol: "♥", name: "Hearts", color: "#A32D2D" },
  { symbol: "♦", name: "Diamonds", color: "#A32D2D" },
  { symbol: "♣", name: "Clubs", color: "#2B2B2B" },
  { symbol: "♠", name: "Spades", color: "#2B2B2B" },
];

export const SUIT_SYMBOLS = SUITS.map((s) => s.symbol);

export const DECLARATION_TYPES = [
  { id: "belote", label: "Belote (K+Q trumps)", points: 20 },
  { id: "tierce", label: "Three in a row", points: 20 },
  { id: "quarte", label: "Four in a row", points: 50 },
  { id: "quinte", label: "Five in a row", points: 100 },
  { id: "square", label: "Four of a kind (A/K/Q/10)", points: 100 },
  { id: "nines", label: "Four nines", points: 150 },
  { id: "jacks", label: "Four jacks", points: 200 },
  { id: "custom", label: "Custom", points: 0 },
];

export const SAVE_KEY = "pilotta:current-game";
