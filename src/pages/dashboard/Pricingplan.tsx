import { PlanResponseType } from "../../api/ResponseType";
import usePlans from "../../api/usePlans";
import Loader from "../../components/loader/Loader";
import { SubsctionPlan } from "../../components/SubscriptionPlan";
import useTitle from "../../hooks/useTitle";

export default function Pricingplan() {
  useTitle("Pricing");
  const plans = usePlans() || [];
  return (
    <div className="card border-0">
      <div className="card-body">
        <div className="tabs-menu-body">
          <div className="tab-content">
            <div className="tab-pane  active " id="monthly_plans">
              <p className="font-weight-normal text-center mb-6">
                Subscribe to our Monthly Subscription Plans and enjoy ton of
                benefits
              </p>
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
  );
}
