import plan_section from "../../api/content/plan_section";
import { useContent } from "../../api/context/ContentProvider";
import FeaturesHeader from "../FeaturesHeader";
import Loader from "../loader/Loader";
import { SubsctionPlan } from "../SubscriptionPlan";
export default function PlanSection() {
  const content = useContent('plan_section', plan_section)
  return (
    <section id="prices-wrapper">
      <div className="container">
        <FeaturesHeader
          title={content?.content?.title}
          text={content?.content?.text}
        />
        {/* END SECTION TITLE */}
        <div className="row">
          <div className="card-body">
            <div className="tabs-menu-body">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="monthly_plans">
                  <div className="row justify-content-md-center">
                    {content.plans ? (
                      content.plans?.map((plan, _k: number) => (
                        <SubsctionPlan key={_k} plan={plan} />
                      ))
                    ) : (
                      <Loader />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
