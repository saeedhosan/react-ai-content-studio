

import data from "./settingJson";
import { unslash } from "./utils/url";

const __url = window.location.protocol + "//" + window.location.host;

const settings = {
  /**
   * app url
   */
  app_url: unslash(__url),
  /**
   * app_name
   */
  app_name: data?.app_name || "app_name",

  /**
   * app_title
   */
  app_title: data?.app_title || "app_title",

  /**
   * app logo
   */
  app_logo: data.app_logo || "",

  /**
   * app lang
   */
  app_lang: data?.app_lang || "en-US",

  /**
   * app description
   */
  app_desc: data?.app_desc || "",

  /**
   * app favicon
   */
  app_favicon: data?.app_favicon || "",

  /**
   * app base route
   */

  app_basename: data?.app_basename || "",

  /**
   * app currency
   */

  app_currency: "USD",

  /**
   * app rest url
   */
  app_rest_url: unslash(data.app_rest_url || ""),

  /**
   * app stroage name
   */
  auth_session: import.meta.env.VITE_AUTH_SESSTION || "",
};
export default settings;
