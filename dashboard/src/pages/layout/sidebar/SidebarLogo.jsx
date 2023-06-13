import { settings } from "../../../app/settings";

export default function SidebarLogo() {
  return (
    <div className="app-sidebar__logo">
      <a className="header-brand" href={settings.app_url}>
        <img
          style={{ height: "100% !important" }}
          src={settings.app_icon}
          className="header-brand-img desktop-lgo"
          alt="logo"
        />
        <img
          src={settings.app_icon}
          className="header-brand-img mobile-logo"
          alt="logo"
        />
      </a>
    </div>
  );
}
