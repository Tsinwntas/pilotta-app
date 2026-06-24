import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace "pilotta-scorer" with your actual GitHub repository name.
// e.g. if your repo is github.com/yourname/pilotta then set base: "/pilotta/"
export default defineConfig({
  plugins: [react()],
  base: "/pilotta-app/",
});
