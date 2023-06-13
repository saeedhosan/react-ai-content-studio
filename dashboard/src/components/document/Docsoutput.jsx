/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Editor from "../Editor";
export default function Docsoutput({ ...rest }) {
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
                className="template-button mr-1"
                title="Export as Word Document"
              >
                <i className="fa-solid fa-file-word table-action-buttons view-action-button" />
              </a>
            </div>
            <div>
              <a
                id="export-pdf"
                className="template-button mr-1"
                href="#"
                title="Export as PDF Document"
              >
                <i className="fa-solid fa-file-pdf table-action-buttons view-action-button" />
              </a>
            </div>
            <div>
              <a
                id="copy-button"
                className="template-button mr-1"
                href="#"
                title="Copy Text"
              >
                <i className="fa-solid fa-copy table-action-buttons edit-action-button" />
              </a>
            </div>
            <div>
              <a
                id="save-button"
                className="template-button"
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
                    className="form-control "
                    id="document"
                    name="document"
                    defaultValue="New Document"
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
              <Editor {...rest} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
