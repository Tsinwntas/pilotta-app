import { SUITS } from "../constants";

export default function SuitGlyphs({ style }) {
  return (
    <div style={{ ...style, display: "flex", justifyContent: "center", gap: "0.35em", fontSize: "1.1rem", marginTop: "6px" }}>
      {SUITS.map((s) => (
        <span key={s.symbol} style={{ color: s.color, lineHeight: 1 }}>
          {s.symbol}
        </span>
      ))}
    </div>
  );
}