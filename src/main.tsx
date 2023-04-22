import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TimerProvider } from "./contexts/TimerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TimerProvider initialTime={120}>
      <App />
    </TimerProvider>
  </React.StrictMode>
);
