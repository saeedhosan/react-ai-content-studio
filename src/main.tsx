import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//jquery
$(document).on("click", '[data-toggle="sidebar"]', function () {
  $(".app").toggleClass("sidenav-toggled");
});
//css
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

//components
import axios from "axios";
import Router from "./Router";
import AuthProvider from "./api/context/AuthContext";
import ContentProvider from "./api/context/ContentProvider";
import endpoints from "./api/endpoints";
import CustomerScript from "./app/CustomerScript";
import settings from "./app/settings";

//consulasion
export const Index = () => {
  axios.defaults.baseURL = endpoints.baseURL;
  axios.interceptors.request.use((config) => {
    config.baseURL = endpoints.baseURL;
    config.withCredentials = true;
    config.headers.Authorization = "Bearer " + window.btoa('saeed:jDlL YB1A A81Z BiNk bgbZ cCA1')
    return config;
  });
  // if (storage) {
  // }
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter basename={settings.app_basename}>
        <ToastContainer />
        <CustomerScript />
        <ContentProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ContentProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

//react reander
const rootdiv = import.meta.env.VITE_APP_ROOTDIV || "%VITE_APP_ROOTDIV%";
const element = document.getElementById(rootdiv) as HTMLElement;
ReactDOM.createRoot(element).render(<React.StrictMode children={<Index />} />);
