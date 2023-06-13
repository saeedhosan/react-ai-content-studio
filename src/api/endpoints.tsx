import settings from "../app/settings";

export default {
  baseURL: settings.app_rest_url,
  signup: "/signup",
  login: "/login",
  _user: "/user",
  plans: "/plans",
  posts: "/posts",
  _post: "/post/?slug=",
  contact: "/messages",

  /**
   * protected api
   */
  dashboard: "/dashboard",
  documents: "/documents",
};
