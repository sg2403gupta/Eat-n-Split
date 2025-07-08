import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Eat-n-Split/", // <-- Add this line (slash before and after repo name)
});
