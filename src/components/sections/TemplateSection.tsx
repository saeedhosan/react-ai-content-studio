import { Link } from "react-router-dom";
import template_section from "../../api/content/template_section";
import { borderRound } from "../../app/utils/convert";
import { dpath } from "../../app/utils/url";
import FeaturesHeader from "../FeaturesHeader";

export default function TemplateSection(): JSX.Element {
  const templates = template_section?.templates || [];

  return (
    <section id="features-templage">
      <div className="container">
        <FeaturesHeader
          title={template_section?.content?.title}
          text={template_section?.content?.text}
        />
        {/* LIST OF SOLUTIONS */}
        <div className="row d-flex">
          {templates &&
            templates?.map((item, key) => (
              <div key={key} className="col-lg-4 col-md-6 col-sm-12">
                <Link to={dpath(`/templates/${item._url}`)}>
                  <div className="template" style={{ marginBottom: "2.6rem" }}>
                    <div
                      className={`card border-0 ${borderRound("round-medium")}`}
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
                </Link>
              </div>
            ))}
        </div>{" "}
        {/* END LIST OF SOLUTIONS */}
      </div>
    </section>
  );
}
