import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import contact_section from "../../api/content/contact_section";
import endpoints from "../../api/endpoints";
import { borderRound } from "../../app/utils/convert";
import { getAuthSession } from "../../app/utils/storage";
import { errorToString } from "../../app/utils/utils";
import FeaturesHeader from "../FeaturesHeader";

export default function ContactSection() {
    //contact section data
    const user = getAuthSession();
    const [name, setName] = useState(user?.nickname || "");
    const [email, setEmail] = useState(user?.usermail || "");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (user) {
            setName(user?.nickname);
            setEmail(user?.usermail);
        }
    }, [user]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name) {
            setErrors("Please Type Your name");
        } else if (!email) {
            setErrors("Please enter Your email address");
        } else if (!message) {
            setErrors("Write somthing");
        } else {
            setLoading(true);
            (async () => {
                try {
                    const _data = { name, email, message };
                    const response = await axios.get(endpoints.contact, { data: _data }); //only for demo
                    //const response = await axios.post(endpoints.contact, _data);
                    if (response.data?.success) {
                        toast.success(response.data?.message);
                        setMessage("");
                        setErrors("");
                    } else {
                        setErrors(errorToString(response));
                        toast.error(errorToString(response));
                    }
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setErrors(errorToString(error));
                }
            })();
        }
    }

    return (
        <section id="contact-wrapper">
            <div className="container">
                <FeaturesHeader
                    title={contact_section?.content?.title || ""}
                    text={contact_section?.content?.text || ""}
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
                            src={contact_section?.content?.bg_image || ""}
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
                                            className={`form-control ${borderRound("round-full")}`}
                                            name="name"
                                            autoComplete="off"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="input-box mb-4">
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control ${borderRound("round-full")}`}
                                            name="email"
                                            autoComplete="off"
                                            placeholder="Email Address"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col-md-12 col-sm-12">
                                    <div className="input-box">
                                        <textarea
                                            className={`form-control ${borderRound("round-10px")}`}
                                            rows={10}
                                            required
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
                                        className={`btn btn-primary ${borderRound("round-full")}`}
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
