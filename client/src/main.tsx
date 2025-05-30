import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

try {
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Failed to render React app:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
      <h1>Application Error</h1>
      <p>Failed to load the application. Check the console for details.</p>
      <pre>${error}</pre>
    </div>
  `;
}
