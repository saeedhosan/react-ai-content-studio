import { Link } from "react-router-dom";
import settings from "../../../../app/settings";

export default function SidebarLogo() {
  return (
    <div className="app-sidebar__logo">
      <Link className="header-brand" to={"/"}>
        <img
          style={{ height: "100% !important" }}
          src={settings.app_logo || ""}
          className="header-brand-img desktop-lgo"
          alt="logo"
        />
        <img
          src={settings.app_logo || ""}
          className="header-brand-img mobile-logo"
          alt="logo"
        />
      </Link>
    </div>
  );
}
