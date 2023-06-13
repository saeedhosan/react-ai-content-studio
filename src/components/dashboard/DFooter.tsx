import { Link } from "react-router-dom";
import settings from "../../app/settings";
export default function DFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-sm-12 text-center">
            Copyright © {new Date().getFullYear()}{" "}
            <Link
              to={settings.app_url}
              style={{
                textTransform: "capitalize",
              }}
            >
              {settings.app_name}
            </Link>
            . All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
