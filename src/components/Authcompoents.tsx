import { Link } from "react-router-dom";
import settings from "../app/settings";
export function AuthFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-sm-12 text-muted text-center">
            Copyright © {new Date().getFullYear()}{" "}
            <Link to={"/"} className="text-capitalize">
              {settings.app_name}
            </Link>
            . All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AuthImage({ url = null }: { url?: string | null }) {
  const login_bg = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
  };
  return <div className="login-bg" style={login_bg} />;
}

export function AuthTitle({
  text = "welcome to ",
}: {
  text?: string;
}): JSX.Element {
  return (
    <h4 className="text-center font-weight-bold mb-8">
      {text}
      <Link className="text-capitalize" to={"/"}>
        {settings.app_name}
      </Link>
    </h4>
  );
}
