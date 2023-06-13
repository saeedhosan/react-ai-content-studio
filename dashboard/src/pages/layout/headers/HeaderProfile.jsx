import { Link } from "react-router-dom";
import { useAuth } from "../../../app/context/AuthContext";
import { textcontent } from "../../../app/data";
import { avatar } from "../../../app/helper";
import { settings } from "../../../app/settings";
import { SettingToLoader } from "../../../components/loader/SettingLoader";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function HeaderProfile() {
  const { user } = useAuth();
  const menus = [
    {
      name: "My Account",
      _url: settings.app_url + "/wp-admin/profile.php",
      icon: "profile-icon fa-solid fa-id-badge",
      async: false,
    },
    {
      name: "Templates",
      icon: "profile-icon fa-solid fa-microchip-ai",
      _url: "templates",
      sync: true,
    },
    {
      name: "Affiliate Program",
      icon: "profile-icon fa-solid fa-badge-dollar",
      _url: textcontent.affiliate_url,
      sync: false,
    },
    {
      name: "Purchase History",
      icon: "profile-icon fa-solid fa-money-check-pen",
      _url: "purchase",
      sync: true,
    },
    {
      name: "Support Request",
      icon: "profile-icon fa-solid fa-messages-question",
      _url: "support",
      sync: true,
    },
    {
      name: "Logout",
      icon: "profile-icon fa-solid fa-right-from-bracket",
      _url: settings.app_url + "/logout",
      sync: false,
    },
  ];
  return (
    <div className="dropdown profile-dropdown ml-4">
      <a href="#" className="nav-link" data-bs-toggle="dropdown">
        <span className="float-right">
          <img
            src={
              user?.data?.image
                ? user?.data?.image
                : avatar(user?.data?.display_name)
            }
            alt="img"
            className="avatar avatar-md"
          />
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow animated">
        <div className="text-center pt-2">
          <span className="text-center user fs-12 pb-0 font-weight-bold">
            {user && user?.data?.display_name}
          </span>
        </div>

        {user ? (
          menus &&
          menus.map((menu, k) => {
            if (menu?.sync) {
              return (
                <Link key={k} className="dropdown-item d-flex" to={menu?._url}>
                  <span className={menu?.icon} />
                  <div className="fs-12">{menu?.name}</div>
                </Link>
              );
            } else {
              return (
                <a key={k} className="dropdown-item d-flex" href={menu?._url}>
                  <span className={menu?.icon} />
                  <div className="fs-12">{menu?.name}</div>
                </a>
              );
            }
          })
        ) : (
          <SettingToLoader count={4} />
        )}
      </div>
    </div>
  );
}
