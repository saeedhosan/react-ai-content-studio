import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { borderRound, extartError } from "../app/utils/convert";
import { AuthFooter } from "../components/Authcompoents";
import Inputbox from "../components/Inputbox";
import useTitle from "../hooks/useTitle";

export default function PasswordReset() {
  useTitle("Password rest");
  const searchParams = new URLSearchParams(document.location.search);
  const username = searchParams.get("username");
  const user_key = searchParams.get("key");

  const [errors, setErrors] = useState<string | null>(null);
  const [_loading, setLoading] = useState(false);
  const [password, setPasword] = useState("");
  const [confirmP, setComfirP] = useState("");

  function onLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 4) {
      setErrors("password should be at least 4 characters");
      return false;
    } else if (password != confirmP) {
      setErrors("password doesn't matched with confirm password");
      return false;
    } else if (!username) {
      setErrors("unable to find email");
      return false;
    } else if (!user_key) {
      setErrors("unable to find the password rest key");
      return false;
    }
    setLoading(true);

    axios
      .post("/password-reset", { key: user_key, username, password })
      .then(({ data }) => {

        if (data?.success) {
          toast.success(data?.message);
          setPasword("");
          setComfirP("");
        } else {
          toast.warning(extartError(data));
        }
      })
      .catch((err) => toast.error(extartError(err)))
      .finally(() => setLoading(false));
  }
  return (
    <div className="container-fluid justify-content-center">
      <div className="col-md-4 col-sm-12 mx-auto h-80vh">
        <div className={`card border-0 my-8 p-6 ${borderRound("round-10px")}`}>
          <form method="POST" onSubmit={onLogin}>
            <h4 className="text-center font-weight-bold mb-8">
              Password rest request
            </h4>
            <Inputbox
              classes="mb-4"
              label="New password"
              type="password"
              value={password}
              onChange={(e) => {
                setPasword(e.target.value);
                setErrors("");
              }}
            />
            <Inputbox
              classes="mb-4"
              label="Confirm password"
              type="password"
              value={confirmP}
              onChange={(e) => {
                setComfirP(e.target.value);
                setErrors("");
              }}
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
                {_loading ? "loading..." : "password reset"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}
