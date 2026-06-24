import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PilottaScorer from "./PilottaScorer";

// Minimal global reset
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  input[type=number] { -moz-appearance: textfield; }
`;
document.head.appendChild(globalStyle);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PilottaScorer />
  </StrictMode>
);
