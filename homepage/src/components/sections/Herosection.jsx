import { useEffect } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { textcontent } from "../../app/content";
import { useAuth } from "../../app/context/AuthContext";
import { settings } from "../../app/settings";

export default function Herosection() {
  const type_id = "bannar_typed";
  useEffect(() => {
    let _typed = null;
    if (document.querySelector(`#${type_id}`)) {
      _typed = new Typed(`#${type_id}`, {
        strings: textcontent.herosection?.typing || ["<span></span>"],
        typeSpeed: 40,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: true,
      });
    }
    return () => _typed;
  }, []);

  return (
    <section id="main-wrapper">
      <div
        style={{
          backgroundImage: `url(${
            textcontent.herosection?.bgImage ||
            "https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          })`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="h-100vh justify-center min-h-screen"
        id="main-background"
      >
        <div className="container h-100vh ">
          <div className="row h-100vh vertical-center">
            <div className="col-sm-12 upload-responsive">
              <div className="text-container text-center">
                <h3
                  className="mb-6 font-weight-bold text-white"
                  data-aos="fade-left"
                  data-aos-delay={400}
                  data-aos-once="true"
                  data-aos-duration={700}
                >
                  {textcontent.herosection?.welcome}
                </h3>

                {/* middle text and typeing text */}
                <h1
                  className="mx-0 mt-4 text-white fixed-height"
                  data-aos="fade-left"
                  data-aos-delay={600}
                  data-aos-once="true"
                  data-aos-duration={900}
                >
                  {textcontent.herosection?.title}
                </h1>

                {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                <h1
                  className="mt-4 gradient fixed-height"
                  id={type_id}
                  data-aos="fade-left"
                  data-aos-delay={600}
                  data-aos-once="true"
                  data-aos-duration={900}
                ></h1>
                {/* middle text and typeing text */}

                <h3
                  className="my-6 font-weight-bold text-white"
                  data-aos="fade-left"
                  data-aos-delay={400}
                  data-aos-once="true"
                  data-aos-duration={700}
                >
                  {textcontent.herosection?.description}
                </h3>
                <Hearhard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hearhard() {
  const { user, loading } = useAuth();
  if (!loading) {
    if (user) {
      return (
        <a
          href={settings.app_url + "/" + settings.dashboard_path + "/templates"}
          className="btn action-button register-button b-radius-none text-white"
          style={{ background: "#D84727" }}
          data-aos="fade-left"
          data-aos-delay={800}
          data-aos-once="true"
          data-aos-duration={1100}
          rel="noreferrer"
        >
          Got to dashboard
        </a>
      );
    } else {
      return (
        <Link
          to={"/signup"}
          className="btn action-button register-button b-radius-none text-white mt-6"
          style={{ background: "#D84727" }}
          data-aos="fade-left"
          data-aos-delay={800}
          data-aos-once="true"
          data-aos-duration={1100}
        >
          {textcontent.herosection?.button_text || "Try Now For Free"}
        </Link>
      );
    }
  }
  return null;
}
