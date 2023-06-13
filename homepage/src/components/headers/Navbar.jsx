import { Link } from "react-router-dom";
import { useAuth } from "../../app/context/AuthContext";
import { settings } from "../../app/settings";
export default function Navbar() {
  const { user } = useAuth();
  const absolute_url =
    settings.app_url === settings.app_current_url ? "" : settings.app_url + "/";

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light w-100"
      id="navbar-responsive"
    >
      <a className="navbar-brand" href={settings.app_url}>
        <img
          style={{ height: "36px" }}
          id="brand-img"
          src={settings.app_icon}
          alt="favicon"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse section-links" id="navbarNav">
        <ul className="navbar-nav">
          <MenuItem
            name="Home"
            url={absolute_url + "#main-wrapper"}
            linkclass="nav-link scroll active"
          />
          <MenuItem
            name="prices"
            url={absolute_url + "#prices-wrapper"}
            linkclass="nav-link scroll"
          />
          <MenuItem
            name="features"
            url={absolute_url + "#features"}
            linkclass="nav-link scroll"
          />
          <MenuItem
            name="faqs"
            url={absolute_url + "#faq-wrapper"}
            linkclass="nav-link scroll"
          />
          <MenuItem
            name="contact us"
            url={absolute_url + "#contact-wrapper"}
            linkclass="nav-link scroll"
          />
          {!user ? (
            <>
              <MenuItem
                async={true}
                name="login"
                url={"/login"}
                linkclass="btn btn-primary b-radius-none mr-3"
              />
              <MenuItem
                async={true}
                name="signup"
                url={"/signup"}
                linkclass="btn btn-primary b-radius-none"
              />
            </>
          ) : (
            <MenuItem
              async={false}
              name={user?.data?.display_name}
              url={
                settings.app_url + "/" + settings.dashboard_path + "/templates"
              }
              linkclass="ml-3 action-button dashboard-button b-radius-none "
            />
          )}
        </ul>
      </div>
    </nav>
  );
}

export const MenuItem = ({
  async = false,
  name = "",
  url,
  classes = "",
  linkclass = "",
  children,
  ...arg
}) => {
  return (
    <li {...arg} className={"nav-item " + classes}>
      {async ? (
        <Link to={url} className={"  " + linkclass}>
          {children ? children : name}
        </Link>
      ) : (
        <a href={url} className={"  " + linkclass}>
          {children ? children : name}
        </a>
      )}
    </li>
  );
};
