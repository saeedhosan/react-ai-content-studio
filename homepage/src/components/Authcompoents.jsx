import { Link } from "react-router-dom";
import usePostbyurl from "../app/hooks/usePostbyurl";
import { settings } from "../app/settings";
export function AuthFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-sm-12 text-muted text-center">
            Copyright © {new Date().getFullYear()}{" "}
            <a href={settings.app_url}>{settings.app_name}</a>. All rights
            reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AuthImage({ name = "login" }) {
  const { get_post: page } = usePostbyurl(name);
  if (!page?.featured_image) {
    return "";
  } else {
    const login_bg = {
      backgroundImage: `url(${page.featured_image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100%",
    };
    return <div className="login-bg" style={login_bg} />;
  }
}

export function AuthTitle({ text = "welcome to " }) {
  return (
    <h4 className="text-center font-weight-bold mb-8">
      {text}
      <span className="text-info">
        <Link to={"/"}>{settings.app_name}</Link>
      </span>
    </h4>
  );
}
