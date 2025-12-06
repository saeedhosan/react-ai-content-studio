import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import pagespath from "./api/pagespath";
import { getAuthSession } from "./app/utils/storage";
import Blogpage from "./pages/Blogpage";
import ALLImages from "./pages/dashboard/ALLImages";
import Archivedocs from "./pages/dashboard/Archivedocs";
import Checkoutpage from "./pages/dashboard/Checkoutpage";
import Dashboard from "./pages/dashboard/Dashboard";
import DDocuments from "./pages/dashboard/DDocuments";
import DSTemplate from "./pages/dashboard/DSTemplate";
import DTemplates from "./pages/dashboard/DTemplates";
import Layout from "./pages/dashboard/layout/Layout";
import Pricingplan from "./pages/dashboard/Pricingplan";
import Purchasepage from "./pages/dashboard/Purchasepage";
import SupportCreate from "./pages/dashboard/SupportCreate";
import Supportpage from "./pages/dashboard/Supportpage";
import ForgetPassword from "./pages/ForgetPassword";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Nopage from "./pages/Nopage";
import PasswordReset from "./pages/PasswordReset";
import Signup from "./pages/Signup";

//Auth router
function AuthRoute({ jsx }: { jsx: JSX.Element }) {
    const user = getAuthSession();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);
    return user ? null : jsx;
}

//protected
function PrivateRoute({ jsx }: { jsx: JSX.Element }) {
    const user = getAuthSession();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/");
    }, [navigate, user]);
    return user ? jsx : null;
}

export default function Router() {
    return (
        <div className="page-main">
            <div className="main-content">
                <div className="side-app">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<AuthRoute jsx={<Login />} />} />
                        <Route path="/signup" element={<AuthRoute jsx={<Signup />} />} />
                        <Route
                            path="/forget-password"
                            element={<AuthRoute jsx={<ForgetPassword />} />}
                        />
                        <Route
                            path="/password-reset"
                            element={<AuthRoute jsx={<PasswordReset />} />}
                        />
                        <Route path="/logout" element={<PrivateRoute jsx={<Logout />} />} />
                        <Route path={`${pagespath.blog}/:slug`} element={<Blogpage />} />
                        <Route path={"/user"} element={<PrivateRoute jsx={<Layout />} />}>
                            <Route index element={<Dashboard />} />
                            <Route path={"dashboard"} element={<Dashboard />} />
                            <Route path={"templates"} element={<DTemplates />} />
                            <Route path={"templates/:slug"} element={<DSTemplate />} />
                            <Route path={"ducuments"} element={<DDocuments />} />
                            <Route path={"images"} element={<ALLImages />} />
                            <Route path={"pricing"} element={<Pricingplan />} />
                            <Route path={"checkout/:plan_id"} element={<Checkoutpage />} />
                            <Route path={"supports"} element={<Supportpage />} />
                            <Route path={"supports/create"} element={<SupportCreate />} />
                            <Route path={"archive/:docs_id"} element={<Archivedocs />} />
                            <Route path={"purchase"} element={<Purchasepage />} />
                        </Route>
                        <Route path="/*" element={<Nopage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
