//dependencies
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
//all css style
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { settings } from "./app/settings";
//context and components
import AuthProvider from "./app/context/AuthContext";
import CustomerScript from "./app/CustomerScript";
import reportWebVitals from "./reportWebVitals";
import Router from "./Router";
CustomerScript();

function Index() {
  if (settings.app_nonce) {
    axios.defaults.headers.common["X-WP-Nonce"] = settings.app_nonce;
  } else {
    toast.error("somthing went wrong please contact to the developer");
  }

  const queryClient = new QueryClient();
  return (
    <div className="page">
      <div className="main-page">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter basename={settings.basename}>
              <ToastContainer />
              <Router />
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("dashbard_page"));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
reportWebVitals();
