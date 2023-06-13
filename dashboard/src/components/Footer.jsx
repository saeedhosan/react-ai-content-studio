import React from "react";
import { settings } from "../app/settings";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-sm-12 text-center">
            Copyright © {new Date().getFullYear()}{" "}
            <a href={settings.dashboard_url}>{settings.app_name}</a>. All rights
            reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
