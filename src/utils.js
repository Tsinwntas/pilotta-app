import { DECLARATION_TYPES } from "./constants";

let declIdCounter = 0;
export function newDeclaration() {
  declIdCounter += 1;
  return { id: `decl-${declIdCounter}`, type: "belote", points: 20 };
}

export function freshRound(num) {
  return {
    num,
    biddingTeam: "A",
    bid: 80,
    bidSuit: "♥",
    capot: false,
    anapodo: false,
    kleisto: false,      // defenders closed (doubled the bid)
    xanakleidoma: false, // bidders re-opened (redoubled)
    teamATricks: "",
    teamBTricks: "",
    teamADeclarations: [],
    teamBDeclarations: [],
    resolved: false,
    result: null,
  };
}

export function sumDeclarations(list) {
  return list.reduce((s, d) => s + (Number(d.points) || 0), 0);
}

export function describeDeclarations(list, declTypes) {
  if (!list || list.length === 0) return "";
  return list
    .map((d) => {
      const typeInfo = DECLARATION_TYPES.find((dt) => dt.id === d.type) || DECLARATION_TYPES[0];
      const label = declTypes ? (declTypes[typeInfo.id] || typeInfo.id) : typeInfo.id;
      return `${label} (${d.points})`;
    })
    .join(", ");
}
