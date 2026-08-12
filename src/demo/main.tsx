import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DemoShell } from "./DemoShell";
import "./demo-nav.css";
import "./demo.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DemoShell />
  </StrictMode>,
);
