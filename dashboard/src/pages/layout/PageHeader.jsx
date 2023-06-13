/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ name = "Homepage" }) {
  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header mt-5-7">
        <div className="page-leftheader">
          <h4 className="page-title mb-0">{name}</h4>
          <ol className="breadcrumb mb-2">
            <li className="breadcrumb-item">
              <Link to={"/"}>
                <i className="fa-solid fa-chart-tree-map mr-2 fs-12" />
                AI Panel
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to={name}> {name} </Link>
            </li>
          </ol>
        </div>
      </div>
      {/* END PAGE HEADER */}
    </>
  );
}
