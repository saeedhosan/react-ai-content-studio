import { Link } from "react-router-dom";
import { borderRound } from "../app/utils/convert";
import useTitle from "../hooks/useTitle";
export default function Nopage() {
  useTitle("404");
  return (
    <>
      <div
        className="container_404 h-100vh"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/blue-earth-planet-world-background_1017-17268.jpg?w=826&t=st=1683817109~exp=1683817709~hmac=63a2a36ac7e2a0498933ef4c0ea30f50c7975325b06a92e2ccfda4c0e81c1972)",
          backgroundPosition: "top, left",
          backgroundSize: "cover",
        }}
      >
        <div className="row text-center">
          <div
            className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 pb-5 error-main"
            style={{ background: "var(--bg-dark-card)" }}
          >
            <div className="row">
              <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1 my-6">
                <h1 className="m-0 text-light">404 </h1>
                <h6 className="text-light">
                  Ooops! Looks like it is not here{" "}
                </h6>
                <p className="text-light">
                  Keep searching and you will find it one day, we all do!
                </p>
                <Link
                  to="/"
                  className={`btn btn-primary special-action-button mt-3 ${borderRound(
                    "round-full"
                  )}`}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
