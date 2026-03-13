import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { TransactionsProvider } from "./context/TransactionsContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles/index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider>
            <TransactionsProvider>
              <App />
              <Toaster position="top-right" />
            </TransactionsProvider>
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
