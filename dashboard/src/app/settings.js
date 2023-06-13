import { unslash } from "./helper";

let app = window.app_config;
export const settings = {
  /**
   * application name
   */
  app_name: app?.app_name || "Wordpress.com",
  /**
   * application title
   */
  app_title: app?.app_title || "app title",
  /**
   * application url
   */
  app_url: app?.app_url || "/",
  /**
   * application url
   */
  dashboard_url: app?.dashboard_url || "/",
  /**
   * application favicon
   */
  app_icon: app?.app_icon || "",
  /**
   * application description
   */
  description: app?.app_description || "",
  /**
   * application base route for react-route-dom
   */
  basename: app?.route_dashboard || "",
  /**
   * wp rest api base
   */
  wp_rest_url: unslash(app?.wp_rest_url) || "",
  /**
   * wp rest api base
   */
  wc_rest_url: unslash(app?.wc_rest_url) || "",
  /**
   * application own rest api
   */
  app_rest_url: unslash(app?.app_rest_url) || "",

  /**
   * woocommerce wc_currency
   */
  app_currency: app?.app_currency || "USD",

  /**
   * application nonce
   */
  app_nonce: app?.app_nonce || "",

  /**
   * stripe public key
   */
  app_stripe_key: app?.app_stripe_key || "",

  /**
   * app language
   */
  app_language: window.navigator.language || "en-US",
};
