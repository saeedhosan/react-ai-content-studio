import { textcontent } from "../../app/content";
import { app_data } from "../../app/data";
import FeaturesHeader from "./FeaturesHeader";

export default function FeaturesSection() {
  const featuredata = app_data.features;
  return (
    <section id="features">
      <div className="" style={{ margin: "16px" }}>
        <FeaturesHeader
          title={textcontent.featuresSection?.title}
          text={textcontent.featuresSection?.text}
        />
        {/* LIST OF SOLUTIONS */}
        <div className="row d-flex" id="solutions-list">
          {/* SOLUTION */}
          {featuredata.map((item, key) => {
            return (
              <div
                key={key}
                className="col-lg-6 col-md-6"
                style={{ padding: "6px", textAlign: "center" }}
              >
                <div
                  className="solution orang-box-shadow"
                  data-aos={item.aos.zoom}
                  data-aos-delay={item.aos.delay}
                  data-aos-once={item.aos.once ? "true" : "false"}
                  data-aos-duration={item.aos.duration}
                  style={{
                    background:
                      item.box_theme === "dark" ? "#000000" : "#FFFFFF",
                    borderRadius: "1px",
                    minHeight: "480px",
                  }}
                >
                  <div
                    className="solution-content"
                    style={{
                      color: item.box_theme === "dark" ? "#FFFFFF" : "#0000000",
                    }}
                  >
                    <h2 className="py-6" style={{ textTransform: "uppercase" }}>
                      {item.name}
                    </h2>
                    <h4>{item.content}</h4>
                    <div className="solution-logo pt-10">
                      <img src={item.image} alt={item.name} />
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
