// Set up Amplify configuration

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);


// Render the React application

import { createRoot } from "react-dom/client";
import App from "./scripts/App";

const container = document.getElementById("app")!;
const root = createRoot(container);

root.render(<App />);
