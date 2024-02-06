import faq_section from "../../api/content/faq_section";
import { useContent } from "../../api/context/ContentProvider";
import { borderRound } from "../../app/utils/convert";
import FeaturesHeader from "../FeaturesHeader";

export default function FaqSection(): JSX.Element {
  const faq_content = useContent('faq_section', faq_section);
  return (
    <section id="faq-wrapper">
      <div className="container">
        <FeaturesHeader
          title={`Frequently Asked Questions`}
          text={`Here are a few questions we've answered for you.`}
        />
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            {faq_content.faqs?.length > 0 &&
              faq_content.faqs.map((faq, key) => (
                <div
                  key={key}
                  id="accordion"
                  data-aos="fade-left"
                  data-aos-delay={300}
                  data-aos-once="true"
                  data-aos-duration={700}
                >
                  <div className={`card ${borderRound("round-full")}`}>
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
