import settings from "../app/settings";

export default {
    //auth
    auth: {
        user: "/auth/user.json",
        signin: "/auth/signin.json",
        signup: "/auth/signup.json",
        logout: "/auth/logout.json",
    },
    baseURL: settings.app_rest_url,
    plans: "/plans.json",
    posts: "/posts.json",
    _post: "/post.json/?slug=",
    contact: "/messages",

    //protected api
    subscription: "/subscription.json",

    //images
    images: {
        index: "/images/index.json",
        create: "/images/create.json",
        delete: "/images/delete.json",
        update: "/images/update.json",
    },

    //documents
    dashboard: {
        index: "/dashboard/index.json",
        create: "/dashboard/create.json",
        delete: "/dashboard/delete.json",
        update: "/dashboard/update.json",
    },

    //documents
    documents: {
        index: "/documents/index.json",
        create: "/documents/create.json",
        delete: "/documents/delete.json",
        update: "/documents/update.json",
    },

    //supports
    supports: {
        index: "/supports/index.json",
        create: "/supports/create.json",
        delete: "/supports/delete.json",
        update: "/supports/update.json",
    },
    //supports
    purchaseLogs: {
        index: "/purchase-logs/index.json",
        create: "/purchase-logs/create.json",
        delete: "/purchase-logs/delete.json",
        update: "/purchase-logs/update.json",
    },
};
