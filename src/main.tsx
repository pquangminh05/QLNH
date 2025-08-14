import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./share/context/useAuth.tsx";
import React from "react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "8px",
            fontSize: "15px",
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
