/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function HeaderLocale() {
  return (
    <div className="dropdown header-locale">
      <a className="nav-link icon" data-bs-toggle="dropdown">
        <span className="header-icon flag flag-us pr-1" />
        <span className="header-text fs-13 pr-5">EN</span>
      </a>
      <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow animated">
        <div className="local-menu">
          <a
            href="https://write4me.co/locale/es"
            className="dropdown-item d-flex pl-4"
          >
            <div className="text-info">
              <i className="flag flag-es mr-4" />
            </div>
            <div>
              <span className="font-weight-normal fs-12">Español</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
