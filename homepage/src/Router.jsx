import { Route, Routes } from "react-router-dom";
import Blogpage from "./pages/Blogpage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./app/context/AuthContext";

function AuthRoute({ elm }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (user) {
    return null;
  } else {
    return elm;
  }
}

export default function Router() {
  return (
    <div className="page-main">
      <div className="main-content">
        <div className="side-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthRoute elm={<Login />} />} />
            <Route path="/signup" element={<AuthRoute elm={<Signup />} />} />
            <Route path="/:post_url" element={<Blogpage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
