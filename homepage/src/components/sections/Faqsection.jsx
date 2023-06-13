import { textcontent } from "../../app/content";
import { app_data } from "../../app/data";
import FeaturesHeader from "./FeaturesHeader";

export default function Faqsection() {
  const faqs = app_data.faqs;
  return (
    <section id="faq-wrapper">
      <div className="container">
        <FeaturesHeader
          title={textcontent.faqs_section?.title}
          text={textcontent.faqs_section?.text}
        />
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            {faqs?.length > 0 &&
              faqs.map((faq, key) => (
                <div
                  key={key}
                  id="accordion"
                  data-aos="fade-left"
                  data-aos-delay={300}
                  data-aos-once="true"
                  data-aos-duration={700}
                >
                  <div className="card">
                    <div className="card-header" id={"heading" + key}>
                      <h5 className="mb-0">
                        <span
                          className="btn btn-link"
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapse-" + key}
                          aria-expanded="false"
                          aria-controls={"collapse-" + key}
                        >
                          {faq.question.toString().replace(/\?$/, "")}?
                        </span>
                      </h5>
                    </div>
                    <div
                      id={"collapse-" + key}
                      className="collapse"
                      aria-labelledby={"heading" + key}
                      data-bs-parent="#accordion"
                    >
                      <div className="card-body">
                        <div>
                          {faq.answer.toString().replace(/\.$/, "")}.
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
