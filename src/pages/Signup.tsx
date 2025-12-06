import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../api/content/assets";
import endpoints from "../api/endpoints";
import { borderRound } from "../app/utils/convert";
import { getAuthSession, setAuthSession } from "../app/utils/storage";
import { errorToString } from "../app/utils/utils";
import { isMail } from "../app/utils/validation";
import { AuthFooter, AuthImage, AuthTitle } from "../components/Authcompoents";
import Inputbox from "../components/Inputbox";
import useTitle from "../hooks/useTitle";

export default function Signup() {
    useTitle("Signup");
    if (getAuthSession()) toast.warn("Already logged in an account!");
    const [errors, setErrors] = useState("");
    const [usermail, setUsermail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkterms, setTerms] = useState(true);

    const navigate = useNavigate();

    function onSignup(e: React.FormEvent) {
        e.preventDefault();
        if (!usermail) {
            setErrors("The email field is required");
            return false;
        } else if (!isMail(usermail)) {
            setErrors("The email address is not valid: " + usermail);
            return false;
        } else if (password.length < 4) {
            setErrors("password should be at least 4 characters");
            return false;
        } else {
            setLoading(true);
            (async () => {
                try {
                    const _data = {
                        usermail,
                        password,
                        nickname,
                    };
                    const response = await axios.post(endpoints?.auth.signup, _data);
                    if (response.data?.user) {
                        toast.success(response.data?.message);
                        setAuthSession(response.data?.user);
                        setTimeout(() => {
                            navigate("/user");
                        }, 1000);
                    } else {
                        toast.error(errorToString(response));
                    }
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    toast.error(errorToString(error));
                }
            })();
        }
    }

    return (
        <div className="container-fluid justify-content-center">
            <div className="row h-100vh align-items-center background-white">
                <div className="col-md-6 h-100 p-0">
                    <AuthImage url={assets?.image?.signup || ""} />
                </div>
                <div className="col-md-6 h-100" id="login-responsive">
                    <div className="card-body pr-8 pl-8 pt-8">
                        <form method="POST" onSubmit={onSignup}>
                            <AuthTitle text="Welcome to " />
                            <Inputbox
                                classes="mb-4"
                                label="Your nickname"
                                name={"first_name"}
                                value={nickname}
                                onChange={(e) => {
                                    setNickname(e.target.value);
                                    setErrors("");
                                }}
                            />
                            <Inputbox
                                classes="mb-4"
                                label="Email Address"
                                type="email"
                                value={usermail}
                                name={"email"}
                                onChange={(e) => {
                                    setUsermail(e.target.value);
                                    setErrors("");
                                }}
                            />
                            <Inputbox
                                classes="mb-6"
                                label="password"
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
                                            name="terms"
                                            id="terms"
                                            checked={checkterms}
                                            onChange={() => setTerms(!checkterms)}
                                        />
                                        <span className="custom-switch-indicator" />
                                        <span className="custom-switch-description">
                                            Are, you agree to our{" "}
                                            <Link to={"/terms-and-conditions"}>
                                                Terms and Conditions
                                            </Link>{" "}
                                            and <Link to={"/privacy-policy"}>Privacy Policy</Link>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            {errors && (
                                <div
                                    className={
                                        "form-group text-white px-4 py-2 bg-danger mb-4 fs-14" +
                                        borderRound("round-normal")
                                    }
                                    dangerouslySetInnerHTML={{ __html: errors }}
                                ></div>
                            )}
                            <div className="form-group mb-3">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className={`btn btn-primary mr-2 ${borderRound("round-full")}`}
                                >
                                    {loading ? "loading.." : "Signup"}
                                </button>
                                <Link
                                    to={"/login"}
                                    className={`btn btn-cancel ${borderRound("round-full")}`}
                                >
                                    login
                                </Link>
                            </div>
                            <p className="text-muted "></p>
                        </form>
                    </div>
                    <AuthFooter />
                </div>
            </div>
        </div>
    );
}
