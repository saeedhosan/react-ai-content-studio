import React from "react";

export default function TableHeader({ ...rest }) {
  return (
    <div className="col-md-3">
      <input
        type="search"
        className="form-control px-3 p-0"
        {...rest}
        placeholder="Search..."
      />
      <i className="fa fa-search search-icon ml-4" />
    </div>
  );
}
