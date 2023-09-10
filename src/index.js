import React from 'react';
import { createRoot } from "react-dom/client";
import App from './components/App'; // Import your main application component

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);