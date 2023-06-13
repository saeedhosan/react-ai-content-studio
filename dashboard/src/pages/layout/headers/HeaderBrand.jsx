import { settings } from "../../../app/settings";
export default function HeaderBrand() {
  return (
    <a className="header-brand" href={settings.app_url}>
      <img
        src={settings.app_icon}
        className="header-brand-img mobile-logo"
        alt="logo"
      />
    </a>
  );
}
