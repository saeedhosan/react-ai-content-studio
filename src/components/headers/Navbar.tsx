import settings from "../../app/settings";
import { borderRound } from "../../app/utils/convert";
import { getAuthSession } from "../../app/utils/storage";
import { dpath } from "../../app/utils/url";
import MenuItem from "./Menuitem";

export default function Navbar() {
  const user = getAuthSession();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light w-100"
      id="navbar-responsive"
    >
      <a href={settings.app_url} className="navbar-brand">
        <img
          style={{ height: "36px" }}
          id="brand-img"
          src={settings.app_favicon || ""}
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
            path={"#main-wrapper"}
            classes="nav-link scroll active"
          />
          <MenuItem
            name="prices"
            path={"#prices-wrapper"}
            classes="nav-link scroll"
          />
          <MenuItem
            name="features"
            path={"#features"}
            classes="nav-link scroll"
          />
          <MenuItem
            name="faqs"
            path={"#faq-wrapper"}
            classes="nav-link scroll"
          />
          <MenuItem
            name="contact us"
            path={"#contact-wrapper"}
            classes="nav-link scroll"
          />
          <MenuItem
            name="blogs"
            path={"#blog-wrapper"}
            classes="nav-link scroll"
          />
          {!user ? (
            <>
              <MenuItem
                sync
                name="login"
                path={"/login"}
                classes={`btn btn-primary  mr-3 ${borderRound("round-full")}`}
              />
              <MenuItem
                sync
                name="signup"
                path={"/signup"}
                classes={`btn btn-primary ${borderRound("round-full")}`}
              />
            </>
          ) : (
            <MenuItem
              sync
              name={user?.nickname || "dashboard"}
              path={`${dpath()}`}
              classes={`ml-3 action-button dashboard-button ${borderRound(
                "round-full"
              )}`}
            />
          )}
        </ul>
      </div>
    </nav>
  );
}
