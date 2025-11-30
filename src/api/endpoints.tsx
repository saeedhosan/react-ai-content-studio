import settings from "../app/settings";

export default {
    baseURL: settings.app_rest_url,
    signup: "/signup.json",
    login: "/login.json",
    _user: "/user.json",
    plans: "/plans.json",
    posts: "/posts.json",
    _post: "/post.json/?slug=",
    contact: "/messages",

    /**
     * protected api
     */
    dashboard: "/dashboard",
    documents: "/documents",
    images: "/images.json",
    subscription: "subscription.json",
};
