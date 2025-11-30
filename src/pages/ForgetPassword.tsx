import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import settings from "../app/settings";
import { borderRound } from "../app/utils/convert";
import { errorToString } from "../app/utils/utils";
import { AuthFooter } from "../components/Authcompoents";
import Inputbox from "../components/Inputbox";
import useTitle from "../hooks/useTitle";

export default function ForgetPassword() {
    useTitle("Forget password");
    const [errors, setErrors] = useState<string | null>(null);
    const [_loading, _setLoading] = useState(false);
    const [username, setUsername] = useState("");

    function onLogin(e: React.FormEvent) {
        e.preventDefault();
        if (!username) {
            setErrors("The email address is required!");
            return false;
        } else {
            _setLoading(true);
        }
        axios
            .post("/forget-password", { username, home_url: settings.app_url })
            .then(({ data }) => {
                if (data?.success) {
                    toast.success(data?.message);
                    setUsername("");
                } else {
                    toast.warning(errorToString(data));
                }
            })
            .catch((err) => toast.error(errorToString(err)))
            .finally(() => _setLoading(false));
    }
    return (
        <div className="container-fluid justify-content-center">
            <div className="col-md-4 col-sm-12 mx-auto h-80vh">
                <div className={`card border-0 my-8 p-6 ${borderRound("round-10px")}`}>
                    <form method="POST" onSubmit={onLogin}>
                        <h4 className="text-center font-weight-bold mb-8">Password rest request</h4>
                        <Inputbox
                            classes="mb-4"
                            label="Your email address"
                            name={"username"}
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        {errors && (
                            <div
                                className={`form-group ${borderRound(
                                    "round-normal"
                                )} text-white px-4 py-2 bg-danger mb-4 fs-14 `}
                                dangerouslySetInnerHTML={{ __html: errors }}
                            ></div>
                        )}
                        <div className="form-group d-flex justify-content-between mt-8">
                            <Link
                                to={"/login"}
                                className={`btn btn-cancel ${borderRound("round-full")}`}
                            >
                                Login
                            </Link>

                            <button
                                disabled={_loading}
                                type="submit"
                                className={`btn btn-primary mr-2 ${borderRound("round-full")}`}
                            >
                                {_loading ? "loading..." : "password rest link"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <AuthFooter />
        </div>
    );
}
