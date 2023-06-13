import { textcontent } from "../../app/content.js";
import { app_data } from "../../app/data.js";
import { settings } from "../../app/settings.js";
import FeaturesHeader from "./FeaturesHeader.jsx";
export default function FeaturesTemplages() {
  const templates = app_data?.templates;
  return (
    <section id="features-templage">
      <div className="container">
        <FeaturesHeader
          title={textcontent.featuresTemplate?.title}
          text={textcontent.featuresTemplate?.text}
        />
        {/* LIST OF SOLUTIONS */}
        <div className="row d-flex">
          {templates &&
            templates?.map((item, key) => (
              <div key={key} className="col-lg-4 col-md-6 col-sm-12">
                <a
                  target="_blank"
                  href={
                    settings.app_url +
                    "/" +
                    settings.dashboard_path +
                    "/template/" +
                    item._url
                  }
                  rel="noreferrer"
                >
                  <div className="template" style={{ marginBottom: "2.6rem" }}>
                    <div
                      className="card border-0"
                      id={"asp-templage-card" + key}
                    >
                      <div className="card-body pt-5">
                        <div className="template-title">
                          <i className={"float-left " + item.icon} />
                          <h6 className="mb-2 fs-16 number-font text-center">
                            {item.name}
                          </h6>
                        </div>
                        <div className="template-info my-6">
                          <p className="fs-12 text-muted text-center">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </div>{" "}
        {/* END LIST OF SOLUTIONS */}
      </div>
    </section>
  );
}
