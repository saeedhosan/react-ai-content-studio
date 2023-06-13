import axios from "axios";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import exportTopdf, {
  copyToClipboard,
  exportToDocs,
  extartError,
} from "../app/helper";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import Editor from "../components/Editor";
import Loaders from "../components/loader/Loaders";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Archivedocs() {
  useTitle("Archive");
  const { docs_id } = useParams();
  const [docs_name, setDocsname] = useState("New Docuemnt");
  const [archive, setArchive] = useState(null);
  const [content, setContent] = useState("");
  const [edittxt, setEdittxt] = useState("");

  //fetch document on server
  useEffect(() => {
    axios
      .post(settings.app_rest_url + "/documents/archive", { id: docs_id })
      .then(({ data }) => {
        if (data?.success) {
          setArchive(data?.archive);
          setDocsname(data?.archive?.docs_name);
          setContent(data?.archive?.html);
          setEdittxt(data?.archive?.text);
        } else {
          toast.error(extartError(data));
        }
      })
      .catch((err) => toast.error(extartError(err)));
  }, [docs_id]);

  const ContentChange = (content, delta, source, editor) => {
    setContent(content);
    setEdittxt(editor.getText());
  };

  //update docuemnt on server
  const handleSave = (e) => {
    e.preventDefault();
    axios
      .post(settings.app_rest_url + "/documents/update", {
        id: archive?.id,
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
  const handleCopy = (e) => {
    e.preventDefault();
    if (copyToClipboard(edittxt)) toast.success("copied!");
  };

  //export pdf
  const exportpdf = (e) => {
    e.preventDefault();
    exportTopdf(docs_name, content);
  };

  const exportDocs = (e) => {
    e.preventDefault();
    exportToDocs(docs_name, content);
  };
  return (
    <div className="row">
      <div className="col-lg-8 col-md-12 col-sm-12">
        <div className="card overflow-hidden border-0">
          {archive ? (
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
                    className="template-button mr-1 csr-p"
                    title="Export as Word Document"
                  >
                    <i className="fa-solid fa-file-word table-action-buttons view-action-button" />
                  </a>
                </div>
                <div>
                  <a
                    onClick={exportpdf}
                    className="template-button mr-1 csr-p"
                    title="Export as PDF Document"
                  >
                    <i className="fa-solid fa-file-pdf table-action-buttons view-action-button" />
                  </a>
                </div>
                <div>
                  <a
                    onClick={handleCopy}
                    className="template-button mr-1 csr-p"
                    title="Copy Text"
                  >
                    <i className="fa-solid fa-copy table-action-buttons edit-action-button" />
                  </a>
                </div>
                <div>
                  <a
                    onClick={handleSave}
                    className="template-button csr-p"
                    title="Save Changes"
                  >
                    <i className="fa-solid fa-floppy-disk-pen table-action-buttons delete-action-button" />
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="input-box mb-2">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="document"
                        value={docs_name}
                        onChange={(e) => setDocsname(e.target.value)}
                      />
                    </div>
                  </div>
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
          ) : (
            <Loaders />
          )}

          {/* SAVE CHANGES ACTION BUTTON */}
          <div className="border-0 text-right mb-4 mr-4 mt-4">
            <a
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="btn btn-primary"
            >
              Return
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
