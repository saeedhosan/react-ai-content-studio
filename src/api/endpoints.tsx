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
    images: "/images.json",
    images_create: "/images/create.json",
    images_delete: "/images/delete.json?id",
    subscription: "subscription.json",

    //documents
    documents: {
        index: "/documents/index.json",
        create: "/documents/create.json",
        delete: "/documents/delete.json",
        update: "/documents/update.json",
    },
};
