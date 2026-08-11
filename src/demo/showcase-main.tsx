import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HandStyleShowcase } from "./HandStyleShowcase";
import "./showcase.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HandStyleShowcase />
  </StrictMode>,
);
