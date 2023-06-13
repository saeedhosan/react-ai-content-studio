import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { textcontent } from "../../app/content";
import { useAuth } from "../../app/context/AuthContext";
import { extartError } from "../../app/helper";
import { settings } from "../../app/settings";
import FeaturesHeader from "./FeaturesHeader";

export default function Contactsection() {
  const { user } = useAuth();
  const [fname, setFname] = useState(user?.data?.display_name);
  const [lname, setLname] = useState(user?.data?.user_nicename);
  const [email, setEmail] = useState(user?.data?.user_email);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fname) {
      setErrors("Please Type Your name");
    } else if (!email) {
      setErrors("Please enter Your email address");
    } else if (!phone) {
      setErrors("Please enter your phone number");
    } else if (!message) {
      setErrors("Write somthing");
    } else {
      setLoading(true);
      (async () => {
        try {
          const __url = settings.app_rest_url + "/comments";
          const _data = { fname, lname, email, message, phone };
          const response = await axios.post(__url, _data);
          const { success, message: messages } = response.data;
          if (success) {
            setLoading(false);
            toast.success(messages);
            setFname("");
            setLname("");
            setEmail("");
            setPhone("");
            setMessage("");
          } else {
            setLoading(false);
            setErrors(extartError(messages));
            toast.error(extartError(messages));
          }
        } catch (error) {
          setLoading(false);
          setErrors(extartError(error));
        }
      })();
    }
  }

  return (
    <section id="contact-wrapper">
      <div className="container">
        <FeaturesHeader
          title={textcontent.contact_section?.title}
          text={textcontent.contact_section?.text}
        />
        <div className="row">
          <div
            className="col-md-6 col-sm-12"
            data-aos="fade-left"
            data-aos-delay={300}
            data-aos-once="true"
            data-aos-duration={700}
          >
            <img
              className="w-70"
              src={textcontent.contact_section?.bg_image}
              alt=""
            />
          </div>
          <div
            className="col-md-6 col-sm-12"
            data-aos="fade-right"
            data-aos-delay={300}
            data-aos-once="true"
            data-aos-duration={700}
          >
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-md-center">
                <div className="col-md-6 col-sm-12">
                  <div className="input-box mb-4">
                    <input
                      id="name"
                      type="name"
                      className="form-control b-radius-none"
                      name="name"
                      autoComplete="off"
                      placeholder="First Name"
                      required=""
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-box mb-4">
                    <input
                      id="lastname"
                      type="text"
                      className="form-control b-radius-none"
                      name="lastname"
                      autoComplete="off"
                      placeholder="Last Name"
                      required=""
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-md-6 col-sm-12">
                  <div className="input-box mb-4">
                    <input
                      id="email"
                      type="email"
                      className="form-control b-radius-none"
                      name="email"
                      autoComplete="off"
                      placeholder="Email Address"
                      required=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-box mb-4">
                    <input
                      id="phone"
                      type="text"
                      className="form-control b-radius-none"
                      name="phone"
                      placeholder="Phone Number"
                      required=""
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-md-12 col-sm-12">
                  <div className="input-box">
                    <textarea
                      className="form-control b-radius-none"
                      rows={10}
                      required=""
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {errors && (
                <div
                  style={{ minHeight: "40px" }}
                  className={
                    "form-group text-white px-4 py-2 mb-3 rounded bg-danger "
                  }
                >
                  {errors}
                </div>
              )}
              <div className="row justify-content-md-center text-center">
                {/* ACTION BUTTON */}
                <div className="mt-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-primary b-radius-none"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
