import { Link } from "react-router-dom";
import settings from "../../../../app/settings";
import { dpath } from "../../../../app/utils/url";

export default function HeaderBrand() {
  return (
    <Link className="header-brand" to={dpath()}>
      <img
        src={settings.app_logo || ""}
        className="header-brand-img mobile-logo"
        alt="logo"
      />
    </Link>
  );
}
