interface Settings {
    app_url: string;
    app_name: string;
    app_title: string;
    app_lang: string;
    app_logo: string | null;
    app_desc: string;
    app_favicon: string | null;
    app_basename: string;
    app_rest_url: string;
    auth_session: string;
    app_currency: string;
}

import favicon from "../../public/favicon.png";
import logo from "../../public/logo.png";
import { unslash } from "./utils/url";

const __url = window.location.protocol + "//" + window.location.host;
const fake_api = `/${unslash(import.meta.env.VITE_BASENAME || "")}/fake-api`;

const settings: Settings = {
    /**
     * app url
     */
    app_url: unslash(__url),
    /**
     * app_name
     */
    app_name: import.meta.env.VITE_APP_NAME || "Acsion",

    /**
     * app_title
     */
    app_title: import.meta.env.VITE_APP_TITLE || "AI content studio",

    /**
     * app logo
     */
    app_logo: import.meta.env.VITE_APP_LOGO || logo,

    /**
     * app lang
     */
    app_lang: "en-US",

    /**
     * app description
     */
    app_desc: import.meta.env.VITE_APP_DESCRIPTION || "The SPA applicaion is supper and faster.",

    /**
     * app favicon
     */
    app_favicon: import.meta.env.VITE_APP_FAVICON || favicon,

    /**
     * app base route
     */

    app_basename: import.meta.env.VITE_BASENAME || "",

    /**
     * app currency
     */

    app_currency: "USD",

    /**
     * app rest url
     */
    app_rest_url: import.meta.env.VITE_APP_REST_URL || fake_api,

    /**
     * app stroage name
     */
    auth_session: import.meta.env.VITE_AUTH_SESSTION || "83F900JWEKIEDW",
};
export default settings;
