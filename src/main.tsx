import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/alan-sans/400.css";
import "@fontsource/alan-sans/500.css";
import "@fontsource/alan-sans/600.css";
import "@fontsource/alan-sans/700.css";

createRoot(document.getElementById("root")!).render(<App />);
