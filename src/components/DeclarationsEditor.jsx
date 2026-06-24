import { DECLARATION_TYPES } from "../constants";
import { sumDeclarations } from "../utils";

export default function DeclarationsEditor({ teamName, declarations, onAdd, onUpdate, onRemove, styles, t }) {
  const total = sumDeclarations(declarations);

  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
        <label style={{ ...styles.label, marginBottom: 0 }}>{t.declarationsLabel(teamName)}</label>
        {declarations.length > 0 && (
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem", fontWeight: 700, color: "#1B3A2F" }}>
            {total} {t.pts}
          </span>
        )}
      </div>

      {declarations.map((d) => {
        const typeInfo = DECLARATION_TYPES.find((dt) => dt.id === d.type) || DECLARATION_TYPES[0];
        return (
          <div
            key={d.id}
            style={{ display: "grid", gridTemplateColumns: "1fr 70px 28px", gap: "8px", marginBottom: "8px", alignItems: "center" }}
          >
            <select
              style={{ ...styles.input, padding: "8px 10px", fontSize: "0.88rem" }}
              value={d.type}
              onChange={(e) => {
                const dt = DECLARATION_TYPES.find((x) => x.id === e.target.value);
                onUpdate(d.id, { type: dt.id, points: dt.id === "custom" ? d.points : dt.points });
              }}
            >
              {DECLARATION_TYPES.map((dt) => (
                <option key={dt.id} value={dt.id}>
                  {t.declTypes[dt.id]}
                  {dt.id !== "custom" ? ` (${dt.points})` : ""}
                </option>
              ))}
            </select>

            <input
              style={{ ...styles.input, padding: "8px 8px", fontSize: "0.88rem", textAlign: "center" }}
              type="number"
              min={0}
              value={d.points}
              disabled={typeInfo.id !== "custom"}
              onChange={(e) => onUpdate(d.id, { points: Number(e.target.value) || 0 })}
            />

            <button
              onClick={() => onRemove(d.id)}
              aria-label="Remove declaration"
              style={{
                background: "transparent",
                border: "1px solid #c9b896",
                borderRadius: "3px",
                color: "#8B3A2C",
                cursor: "pointer",
                height: "36px",
                fontWeight: 700,
                fontFamily: "'Courier New', monospace",
              }}
            >
              ×
            </button>
          </div>
        );
      })}

      <button
        onClick={onAdd}
        style={{
          background: "transparent",
          border: "1px dashed #8B3A2C",
          borderRadius: "3px",
          color: "#8B3A2C",
          padding: "8px 12px",
          fontSize: "0.8rem",
          fontFamily: "'Courier New', monospace",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 700,
          cursor: "pointer",
          width: "100%",
        }}
      >
        {t.addDeclaration}
      </button>
    </div>
  );
}
