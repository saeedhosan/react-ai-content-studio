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
import AuthProvider from "./api/context/AuthContext";
import endpoints from "./api/endpoints";
import CustomerScript from "./app/CustomerScript";
import settings from "./app/settings";
import Router from "./Router";

//consulasion
export const Index = () => {
    axios.defaults.baseURL = endpoints.baseURL;
    axios.interceptors.request.use((config) => {
        config.baseURL = endpoints.baseURL;
        config.withCredentials = false;
        return config;
    });
    // if (storage) {
    // }
    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter basename={settings.app_basename}>
                <ToastContainer />
                <CustomerScript />
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

//react reander
const element = document.getElementById("root-app") as HTMLElement;
ReactDOM.createRoot(element).render(<React.StrictMode children={<Index />} />);
