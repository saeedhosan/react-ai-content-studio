import plan_section from "../../api/content/plan_section";
import { PlanResponseType } from "../../api/ResponseType";
import usePlans from "../../api/usePlans";
import FeaturesHeader from "../FeaturesHeader";
import Loader from "../loader/Loader";
import { SubsctionPlan } from "../SubscriptionPlan";
export default function PlanSection() {
  const plans = usePlans();
  return (
    <section id="prices-wrapper">
      <div className="container">
        <FeaturesHeader
          title={plan_section?.content?.title}
          text={plan_section?.content?.text}
        />
        {/* END SECTION TITLE */}
        <div className="row">
          <div className="card-body">
            <div className="tabs-menu-body">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="monthly_plans">
                  <div className="row justify-content-md-center">
                    {plans ? (
                      plans?.map((plan: PlanResponseType, _k: number) => (
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
