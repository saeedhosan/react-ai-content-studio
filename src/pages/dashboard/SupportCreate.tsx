import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { borderRound, extartError } from "../../app/utils/convert";
import { dpath } from "../../app/utils/url";
import Textarea from "../../components/dashboard/Textarea";
import Inputbox from "../../components/Inputbox";
export default function SupportCreate() {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [attache, setAttache] = useState<any>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);

  const reset = () => {
    // inputRef.current.value = null;
    setAttache(null);
    setSubject("");
    setMessage("");
  };

  //generator
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) {
      toast.error("The subject field is required");
      return false;
    } else if (!message) {
      toast.error("The message filed is required");
      return false;
    } else if (subject.length > 99) {
      toast.error("The subject is too long please type near 40 words");
      return false;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("attache", attache);
    formData.append("subject", subject);
    formData.append("message", message);

    axios
      .post("/supports/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        if (data?.success) {
          toast.success(data?.message);
          reset();
        } else {
          toast.error(extartError(data));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(extartError(err));
      })
      .finally(() => {
        setLoading(false);
      });
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => setAttache(e.target.files[0])}
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
                    rows={8}
                    label={`Your message`}
                  />
                </div>

                <div className="col-md-12">
                  <Link
                    to={dpath("/supports")}
                    className={`btn btn-primary px-8 fs-10 float-left ${borderRound(
                      "round-full"
                    )}`}
                  >
                    Back
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary px-8 fs-10 float-right ${borderRound(
                      "round-full"
                    )}`}
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
