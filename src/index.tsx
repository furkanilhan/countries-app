import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <HashRouter basename="/">
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HashRouter>
);
