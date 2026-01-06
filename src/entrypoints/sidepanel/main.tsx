import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";

const container = document.getElementById("root");
if (container) {
	createRoot(container).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
