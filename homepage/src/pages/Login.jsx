import axios from "axios";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { extartError } from "../app/helper";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import { AuthFooter, AuthImage, AuthTitle } from "../components/Authcompoents";
import Inputbox from "../components/Inputbox";
export default function Login() {
  useTitle("login");
  const [errors, setErrors] = useState(null);
  const [_loading, _setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  function clearinput() {
    setUsername("");
    setPassword("");
  }

  function onLogin(e) {
    e.preventDefault();
    if (!username) {
      setErrors("Username or email is required!");
      return false;
    } else if (!password) {
      setErrors("empty password!");
      return false;
    } else {
      _setLoading(true);
      (async () => {
        try {
          const url = settings.app_rest_url + "/login";
          const _data = {
            username: username.trim(),
            password: password,
            remember: remember,
          };
          const response = await axios.post(url, _data);
          const { success, message } = response.data;
          if (success) {
            _setLoading(false);
            toast.success(message);
            clearinput();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            _setLoading(false);
            setErrors(message);
          }
        } catch (error) {
          _setLoading(false);
          toast.error(extartError(error));
        }
      })();
    }
  }

  return (
    <div className="container-fluid justify-content-center">
      <div className="row h-100vh align-items-center background-white">
        <div className="col-md-6 h-100 p-0">
          <AuthImage name="login" />
        </div>
        <div className="col-md-6 h-100" id="login-responsive">
          <div className="card-body pr-10 pl-10 pt-10">
            <form method="POST" onSubmit={onLogin}>
              <AuthTitle text="Welcome back to " />
              <Inputbox
                classes="mb-4"
                lable="Username or email address"
                name={"username"}
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors(null);
                }}
              />
              <Inputbox
                classes="mb-4"
                lable="Your password"
                name={"password"}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(null);
                }}
              />

              <div className="form-group mb-4">
                <div className="d-flex">
                  <label className="custom-switch">
                    <input
                      type="checkbox"
                      className="custom-switch-input"
                      name="remember"
                      id="remember"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                    />
                    <span className="custom-switch-indicator" />
                    <span className="custom-switch-description">
                      Keep me logged in
                    </span>
                  </label>
                  <div className="ml-auto">
                    <a
                      className="text-info fs-12"
                      href={
                        settings.app_url + "/wp-login.php?action=lostpassword"
                      }
                    >
                      Forgot Your Password?
                    </a>
                  </div>
                </div>
              </div>
              {errors && (
                <div
                  className={
                    "form-group text-white px-4 py-2 bg-danger mb-4 fs-14"
                  }
                  dangerouslySetInnerHTML={{ __html: errors }}
                ></div>
              )}
              <div className="form-group mb-4">
                <button
                  disabled={_loading}
                  type="submit"
                  className="btn btn-primary mr-2 b-radius-none"
                >
                  Login
                </button>
                <Link to={"/signup"} className="btn btn-cancel b-radius-none">
                  Sign Up
                </Link>
              </div>
              <div className="custom-switch mb-4">
                <span className="text-muted">
                  By continuing, you agree to our{" "}
                  <a
                    href={settings.app_url + "/terms-and-conditions"}
                    className="text-info"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href={settings.app_url + "/privacy-policy"}
                    className="text-info"
                  >
                    Privacy Policy
                  </a>
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
