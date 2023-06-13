import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { extartError, mail_filter } from "../app/helper";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import { AuthFooter, AuthImage, AuthTitle } from "../components/Authcompoents";
import Inputbox from "../components/Inputbox";

export default function Signup() {
  useTitle("signup");
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkterms, setTerms] = useState(true);

  function clearinput() {
    setEmail("");
    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
  }

  function onSignup(e) {
    e.preventDefault();
    if (!username) {
      setErrors("Username is required!");
      return false;
    } else if (!email) {
      setErrors("Email is required!");
      return false;
    } else if (!mail_filter(email)) {
      setErrors("please enter a valid email address!");
      return false;
    } else if (password.length < 6) {
      setErrors("password should be at least 8 characters");
      return false;
    } else {
      setLoading(true);
      (async () => {
        try {
          const url = settings.app_rest_url + "/signup";
          const _data = {
            username,
            email,
            password,
            firstname,
            lastname,
          };
          const response = await axios.post(url, _data);
          const { success, message } = response.data;
          if (success) {
            setLoading(false);
            toast.success(message);
            clearinput();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            setLoading(false);
            setErrors(message);
          }
        } catch (error) {
          setLoading(false);
          toast.error(extartError(error));
        }
      })();
    }
  }

  document.querySelectorAll(".entry.objProp").forEach(function (elm, i) {
    elm.click();
  });
  return (
    <div className="container-fluid justify-content-center">
      <div className="row h-100vh align-items-center background-white">
        <div className="col-md-6 h-100 p-0">
          <AuthImage name="signup" />
        </div>
        <div className="col-md-6 h-100" id="login-responsive">
          <div className="card-body pr-8 pl-8 pt-8">
            <form method="POST" onSubmit={onSignup}>
              <AuthTitle text="Welcome to " />
              <Inputbox
                classes="mb-4"
                lable="First Name"
                name={"firstname"}
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  setErrors(null);
                }}
              />
              <Inputbox
                classes="mb-4"
                lable="Last Name"
                name={"lastname"}
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                  setErrors(null);
                }}
              />
              <Inputbox
                classes="mb-4"
                lable="Username"
                value={username}
                name={"username"}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors(null);
                }}
              />
              <Inputbox
                classes="mb-4"
                lable="Email Address"
                type="email"
                value={email}
                name={"email"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(null);
                }}
              />
              <Inputbox
                classes="mb-4"
                lable="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(null);
                }}
              />

              <div className="form-group mb-3">
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
                      <Link to={"/terms-and-conditions"} className="text-info">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to={"/privacy-policy"} className="text-info">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
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
              <div className="form-group mb-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary mr-2 b-radius-none"
                >
                  {loading ? "loading.." : "Signup"}
                </button>
                <Link to={"/login"} className="btn btn-cancel b-radius-none">
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
