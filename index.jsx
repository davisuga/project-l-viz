import { createRoot } from "react-dom/client";
import { make as App } from "./src/App.bs";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
