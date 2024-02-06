import feature_section from "../../api/content/feature_section";
import { useContent } from "../../api/context/ContentProvider";
import { borderRound } from "../../app/utils/convert";
import FeaturesHeader from "../FeaturesHeader";

export default function FeatureSection() {
  const features_content = useContent('feature_section', feature_section);
  return (
    <section id="features">
      <div className="" style={{ margin: "16px" }}>
        <FeaturesHeader
          title={feature_section?.content?.title}
          text={feature_section?.content?.text}
        />
        {/* LIST OF SOLUTIONS */}
        <div className="row d-flex" id="solutions-list">
          {/* SOLUTION */}
          {features_content.features.map((item, key) => {
            return (
              <div
                key={key}
                className="col-lg-6 col-md-6"
                style={{ padding: "6px", textAlign: "center" }}
              >
                <div
                  className={`solution orang-box-shadow ${borderRound(
                    "round-10px"
                  )}`}
                  data-aos={item.aos.zoom}
                  data-aos-delay={item.aos.delay}
                  data-aos-once={item.aos.once ? "true" : "false"}
                  data-aos-duration={item.aos.duration}
                  style={{
                    background:
                      item?.box_theme === "dark" ? "#000000" : "#FFFFFF",
                    minHeight: "480px",
                  }}
                >
                  <div
                    className="solution-content"
                    style={{
                      color: item.box_theme === "dark" ? "#fff" : "#0000000",
                    }}
                  >
                    <h3
                      className="py-6"
                      style={{
                        textTransform: "uppercase",
                        color: item.box_theme === "dark" ? "#fff" : "#0000000",
                      }}
                    >
                      {item.name}
                    </h3>
                    <h6
                      style={{
                        color: item.box_theme === "dark" ? "#fff" : "#0000000",
                      }}
                    >
                      {item.content}
                    </h6>
                    <div className="solution-logo pt-10">
                      {/* <img src={item.image} alt={item.name} /> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
    </section>
  );
}
