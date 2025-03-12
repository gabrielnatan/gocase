import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./routes.tsx";
import "./index.css";
import ReactQuery from "./service/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQuery>
      <AppRouter />
    </ReactQuery>
  </StrictMode>
);
