import { useEffect } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import hero_section_ from "../../api/content/hero_section";
import { useContent } from "../../api/context/ContentProvider";
import pagespath from "../../api/pagespath";
import { borderRound } from "../../app/utils/convert";
import { getAuthSession } from "../../app/utils/storage";
import { dpath } from "../../app/utils/url";

export default function HeroSection() {
  const type_id = "bannar_typed";
  const hero_section = useContent<typeof hero_section_>('hero_section', hero_section_);
  useEffect(() => {
    let _typed: Typed;
    if (document.querySelector(`#${type_id}`)) {
      _typed = new Typed(`#${type_id}`, {
        strings: hero_section?.content?.typing || ["<span></span>"],
        typeSpeed: 40,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: true,
      });
    }

    return () => {
      _typed.destroy();
    };
  }, []);

  return (
    <section id="main-wrapper">
      <div
        style={{
          backgroundImage: `url(${hero_section.content.bgImage})`,
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
                  {hero_section?.content?.welcome}
                </h3>

                {/* middle text and typeing text */}
                <h2
                  className="mx-0 mt-4 text-white fixed-height"
                  data-aos="fade-left"
                  data-aos-delay={600}
                  data-aos-once="true"
                  data-aos-duration={900}
                >
                  {hero_section?.content?.title}
                </h2>

                <h2
                  className="mt-4 gradient fixed-height"
                  id={type_id}
                  data-aos="fade-left"
                  data-aos-delay={600}
                  data-aos-once="true"
                  data-aos-duration={900}
                ></h2>
                {/* middle text and typeing text */}

                <h3
                  className="my-6 font-weight-bold text-white"
                  data-aos="fade-left"
                  data-aos-delay={400}
                  data-aos-once="true"
                  data-aos-duration={700}
                >
                  {hero_section?.content.description}
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
  const user = getAuthSession();
  const hero_section = useContent<typeof hero_section_>('hero_section', hero_section_);

  if (user) {
    return (
      <Link
        to={dpath()}
        className={`btn btn-primary ${borderRound("round-full")}`}
        data-aos="fade-left"
        data-aos-delay={800}
        data-aos-once="true"
        data-aos-duration={1100}
        rel="noreferrer"
      >
        Got to dashboard
      </Link>
    );
  } else {
    return (
      <Link
        to={pagespath.auth.signin}
        className={`btn btn-primary ${borderRound("round-full")}`}
        data-aos="fade-left"
        data-aos-delay={800}
        data-aos-once="true"
        data-aos-duration={1100}
      >
        {hero_section?.content.button_text || "Try Now For Free"}
      </Link>
    );
  }
  return null;
}
