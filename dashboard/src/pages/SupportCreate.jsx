import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { extartError } from "../app/helper";
import { settings } from "../app/settings";
import Inputbox from "../components/Inputbox";
import Textarea from "../components/Textarea";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Template() {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attache, setAttache] = useState("");
  const inputRef = useRef(null);

  const reset = () => {
    inputRef.current.value = null;
    setAttache(null);
    setSubject("");
    setMessage("");
  };

  //generator
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) {
      toast.error("Subject is required");
      return false;
    } else if (!message) {
      toast.error("please type any message");
      return false;
    } else if (subject.length > 99) {
      toast.error("Your subject is too long please add near 80 words");
      return false;
    }
    setLoading(true);

    var formData = new FormData();
    formData.append("attache", attache);
    formData.append("subject", subject);
    formData.append("message", message);

    (async () => {
      try {
        const _url = settings.app_rest_url + "/support/create";
        const { data } = await axios.post(_url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data?.success) {
          toast.success(data?.message);
          setLoading(false);
          reset();
        } else {
          setLoading(false);
          toast.error(extartError(data));
        }
      } catch (error) {
        setLoading(false);
        toast.error(extartError(error));
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="card border-0" id="template-input">
            <div className="card-body p-5 pb-0 mb-8">
              <div className="row">
                <div className="template-view">
                  <div className="template-icon mb-2 d-flex">
                    <i className={"fa-solid fa-messages-question web-icon"} />
                    <div>
                      <h6 className="mt-1 ml-3 fs-16 number-font">
                        Create Support Request
                      </h6>
                    </div>
                  </div>
                  <div className="template-info">
                    <p className="fs-12 text-muted mb-4">
                      Create Support Request to get help from the owner
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <Inputbox
                    refs={inputRef}
                    label="Attachment"
                    type="file"
                    onChange={(e) => setAttache(e.target.files[0])}
                  />
                </div>

                <div className="col-md-8">
                  <Inputbox
                    label="Subject"
                    name="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  {/* {attache && (
                    <img src={URL.createObjectURL(attache)} alt="preview" />
                  )} */}
                </div>
                <div className="col-12">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    row={6}
                    label={`Your message`}
                    place={"write  a message"}
                  />
                </div>

                <div className="col-md-12">
                  <Link
                    to={"/support"}
                    className="btn btn-primary fs-14 float-left"
                  >
                    Back
                  </Link>
                  <button
                    disabled={loading}
                    className="btn btn-normal px-6 fs-14 float-right"
                  >
                    {loading ? "Loading.." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
