import axios from "axios";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../api/content/assets";
import endpoints from "../api/endpoints";
import settings from "../app/settings";
import { borderRound } from "../app/utils/convert";
import { setAuthSession } from "../app/utils/storage";
import { errorToString } from "../app/utils/utils";
import { AuthFooter, AuthTitle } from "../components/Authcompoents";
import Inputbox from "../components/Inputbox";
import useTitle from "../hooks/useTitle";

export default function Login() {
    useTitle("Login");
    const [errors, setErrors] = useState<string | null>(null);
    const [_loading, _setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);

    const navigate = useNavigate();

    function onLogin(e: React.FormEvent) {
        e.preventDefault();
        if (!username) {
            setErrors("Username or email is required!");
            return false;
        } else {
            _setLoading(true);
            (async () => {
                try {
                    const _data = {
                        username: username.trim().toString(),
                        password: password,
                        remember: remember,
                    };
                    const response = await axios.post(endpoints.auth.signin, _data);
                    toast.success(response.data?.message);
                    if (response.data?.user) {
                        setAuthSession(response.data?.user);
                        setTimeout(() => {
                            navigate("/user");
                        }, 1000);
                    }
                    _setLoading(false);
                } catch (error) {
                    _setLoading(false);
                    toast.error(errorToString(error));
                }
            })();
        }
    }
    return (
        <div className="container-fluid justify-content-center">
            <div className="row h-100vh align-items-center background-white">
                <div className="col-md-6 p-0">
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src={assets?.image?.login}
                        alt=""
                    />
                </div>
                <div className="col-md-6 h-100" id="login-responsive">
                    <div className="card-body pr-10 pl-10 pt-10">
                        <form method="POST" onSubmit={onLogin}>
                            <AuthTitle text="Welcome back to " />
                            <Inputbox
                                classes="mb-4"
                                label="Username or email address"
                                name={"username"}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Inputbox
                                classes="mb-6"
                                label="Your password"
                                name={"password"}
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors("");
                                }}
                            />

                            <div className="form-group mb-6">
                                <div className="d-flex">
                                    <label className="custom-switch">
                                        <input
                                            type="checkbox"
                                            className="custom-switch-input"
                                            name="remember"
                                            id="remember"
                                            disabled
                                            checked={remember}
                                            onChange={() => setRemember(!remember)}
                                        />
                                        <span className="custom-switch-indicator" />
                                        <span className="custom-switch-description">
                                            Keep me logged in
                                        </span>
                                    </label>
                                    <div className="ml-auto custom-switch">
                                        <Link to={"/forget-password"}>Forgot Password?</Link>
                                    </div>
                                </div>
                            </div>
                            {errors && (
                                <div
                                    className={`form-group ${borderRound(
                                        "round-normal"
                                    )} text-white px-4 py-2 bg-danger mb-4 fs-14 `}
                                    dangerouslySetInnerHTML={{ __html: errors }}
                                ></div>
                            )}
                            <div className="form-group mb-4">
                                <button
                                    disabled={_loading}
                                    type="submit"
                                    className={`btn btn-primary mr-2 ${borderRound("round-full")}`}
                                >
                                    Login
                                </button>
                                <Link
                                    to={"/signup"}
                                    className={`btn btn-cancel ${borderRound("round-full")}`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                            <div className="custom-switch my-6">
                                <span className="text-muted">
                                    By continuing, you agree to our{" "}
                                    <Link to={settings.app_url + "/terms-and-conditions"}>
                                        Terms and Conditions
                                    </Link>{" "}
                                    and <Link to={"/privacy-policy"}>Privacy Policy</Link>
                                </span>
                            </div>
                        </form>
                    </div>
                    <AuthFooter />
                </div>
            </div>
        </div>
    );
}
