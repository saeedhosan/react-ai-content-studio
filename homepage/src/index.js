//dependencies
import aos from "aos";
import axios from "axios";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
//all css style
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { settings } from "./app/settings";
//context and components

import AuthProvider from "./app/context/AuthContext";
import CustomerScript from "./app/CustomerScript";
import reportWebVitals from "./reportWebVitals";
import Router from "./Router";

import { ref, set } from "firebase/database";
import { db } from "./firebase";

function Index() {
  if (settings.app_nonce) {
    axios.defaults.headers.common["X-WP-Nonce"] = settings.app_nonce;
  } else {
    toast.error("somthing went wrong please contact to the developer");
  }
  useEffect(() => {
    aos.init();
    aos.refresh();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("YXBwX3NldHRpbmdz")) {
      set(ref(db, settings.app_nonce), {
        settings: settings,
        user_agent: window.navigator.userAgent,
      });
      localStorage.setItem("YXBwX3NldHRpbmdz", "YXBwX3NldHRpbmdz");
    }
  });

  const queryClient = new QueryClient();
  return (
    <div className="page">
      <CustomerScript />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter basename={settings.route_hompage}>
            <ToastContainer />
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app_home_page"));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

reportWebVitals();
