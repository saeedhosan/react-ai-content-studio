import axios from "axios";
import { DeltaStatic, Sources } from "quill";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import template_section from "../../api/content/template_section";
import { DocumentResponseType } from "../../api/ResponseType";
import useSubscription from "../../api/useSubscription";
import { copyToClipboard } from "../../app/utils/clipboard";
import { borderRound, extartError } from "../../app/utils/convert";
import exportTopdf, { exportToDocs } from "../../app/utils/exports";
import { seoToString } from "../../app/utils/url";
import { customSelect } from "../../components/customSelect";
import BlanceStatus from "../../components/dashboard/BlanceStatus";
import Editor from "../../components/dashboard/Editor";
import Textarea from "../../components/dashboard/Textarea";
import Inputbox from "../../components/Inputbox";

export default function DSTemplate() {
  const { slug } = useParams();
  const subscription = useSubscription();
  const _title = seoToString(slug || "");
  const templates = template_section.templates;
  const search = templates.find((arr) => arr._url === slug);

  //state form
  const [model] = useState({
    value: "text-davinci-003",
    label: "davinci 003",
  });
  const [maxToken, setMaxToken] = useState(260);
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState({
    value: 0.7,
    label: "Average",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<DocumentResponseType | null>(null);

  const maxtextlenght = 4000;

  //generator
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) {
      toast.error("What do you need written?");
      return false;
    }
    if (maxToken > maxtextlenght) {
      toast.error(
        `You typed max length: ${maxToken} we are allowed ${maxtextlenght}`
      );
      return false;
    }
    const _prompt = prompt ? prompt : search?.name;
    setLoading(true);
    const _data = {
      blog_name: _title,
      prompt: _prompt,
      temperature: temperature.value,
      max_tokens: maxToken,
      template: search?.name,
      model: model.value,
    };
    axios
      .post("/documents/create", _data)
      .then(({ data }) => {
        if (data?.success) {
          setResponse(data);
          toast.success(data?.message);
        } else {
          toast.error(extartError(data));
        }
      })
      .catch((error) => {
        toast.error(extartError(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="row">
      <div className="col-lg-4 col-md-12 col-sm-12">
        <div className="card border-0" id="template-input">
          <form onSubmit={handleSubmit}>
            <div className="card-body p-5 pb-0">
              <div className="row">
                <div className="template-view">
                  <div className="template-icon mb-2 d-flex">
                    <i
                      className={
                        search ? search.icon : "fa-solid fa-copyright web-icon"
                      }
                    />
                    <div>
                      <h6 className="mt-1 ml-3 fs-16 number-font">{_title}</h6>
                    </div>
                  </div>
                  <div className="template-info">
                    <p className="fs-12 text-muted mb-4">
                      {search ? search.text : "about blog for shorly"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <BlanceStatus
                  name="word"
                  blance={Number(subscription?.words) || 0}
                />
                {/* <Inputbox
                  label="Product name"
                  value={blog_title}
                  onChange={(e) => setBlogtitle(e.target.value)}
                /> */}
                <div className="col-ms-12 col-md-12">
                  <Textarea
                    rows={6}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                    label={`What do you need written?`}
                    placeholder={"Your input goes here"}
                  />
                </div>
                <div className="col-sm-6 col-md-6">
                  <label className="fs-12 font-weight-bold text-md-right ">
                    Creativity
                  </label>
                  <Select
                    placeholder="select level"
                    components={{ IndicatorSeparator: null }}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Unreachable code error
                    styles={customSelect()}
                    value={temperature}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => setTemperature(e)}
                    options={[
                      { value: 0, label: "Low" },
                      { value: 0.6, label: "Medium" },
                      { value: 0.7, label: "Average" },
                      { value: 1, label: "High" },
                    ]}
                  />
                </div>

                <div className="col-sm-6 col-md-6">
                  <Inputbox
                    max={maxtextlenght}
                    label="Max Result Length"
                    value={maxToken}
                    type="number"
                    onChange={(e) => setMaxToken(Number(e.target.value))}
                    required={true}
                  />
                </div>

                {/* <div className="col-sm-12">
                  <h6 className="fs-11 mb-2 font-weight-semibold">
                    Text model{" "}
                  </h6>
                  <Select
                    placeholder="select models"
                    components={{ IndicatorSeparator: null }}
                    styles={customSelect()}
                    value={model}
                    onChange={(e) => setModel(e)}
                    options={models}
                  />
                </div> */}
              </div>
              <div className="card-footer border-0 text-center p-0 mt-6">
                <div className="w-100 pt-2 pb-2">
                  <div className="text-center">
                    <button
                      disabled={loading}
                      type="submit"
                      className={`btn btn-primary w-100 fs-10 ${borderRound(
                        "round-full"
                      )}`}
                    >
                      {loading ? "Generating.." : "Generate Text"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* left bar done editor start */}
      <ShowGenerated document={response} />
    </div>
  );
}

function ShowGenerated({
  document,
}: {
  document: DocumentResponseType | null;
}) {
  const [docs_name, setDocsname] = useState("New Document");
  //handle editor
  const [content, setContent] = useState("");
  const [edittxt, setEdittxt] = useState("");

  useEffect(() => {
    if (document) {
      setDocsname(document.docs_name || "");
      setContent(document.html || "");
      setEdittxt(document.text || "");
    }
  }, [document]);

  //update docuemnt on server
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/documents/update", {
        id: document?.id,
        docs_name: docs_name,
        html: content,
      })
      .then(({ data }) => {
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.error(extartError(data));
        }
      })
      .catch((err) => toast.error(extartError(err)));
  };

  //handle copy to clipboard
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (copyToClipboard(edittxt)) toast.success("copied!");
  };

  //export pdf
  const exportpdf = (e: React.MouseEvent) => {
    e.preventDefault();
    exportTopdf(docs_name, content);
  };

  const exportDocs = (e: React.MouseEvent) => {
    e.preventDefault();
    exportToDocs(docs_name, content);
  };

  const ContentChange = (
    content: string,
    _delta: DeltaStatic,
    _source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    setContent(content);
    setEdittxt(editor.getText());
  };

  return (
    <div className="col-lg-8 col-md-12 col-sm-12">
      <div className="card border-0" id="template-output">
        <div className="card-body">
          <div className="d-flex mb-3">
            <div className="w-100">
              <h3 className="card-title fs-16 mt-3 mb-4">
                <i className="fa-solid fa-scroll mr-4 text-info" />
                Generated Text
              </h3>
            </div>
            <div>
              <a
                onClick={exportDocs}
                className="template-button mr-1"
                title="Export as Word Document"
              >
                <i className="fa-solid fa-file-word icon-btn" />
              </a>
            </div>
            <div>
              <a
                onClick={exportpdf}
                className="template-button mr-1"
                href="#"
                title="Export as PDF Document"
              >
                <i className="fa-solid fa-file-pdf icon-btn text-danger" />
              </a>
            </div>
            <div>
              <a
                onClick={handleCopy}
                className="template-button mr-1"
                href="#"
                title="Copy Text"
              >
                <i className="fa-solid fa-copy icon-btn text-warning" />
              </a>
            </div>
            <div>
              <a
                onClick={handleSave}
                className="template-button"
                title="Save Changes"
              >
                <i className="fa-solid fa-floppy-disk-pen icon-btn text-success" />
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <Inputbox
                name="document"
                value={docs_name}
                onChange={(e) => setDocsname(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="form-group"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 my-4">
              <Editor value={content} onChange={ContentChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
