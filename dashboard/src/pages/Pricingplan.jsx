import { Link } from "react-router-dom";
import { currencyToSymbol } from "../app/helper";
import usePlans from "../app/hooks/usePlans";
import useTitle from "../app/hooks/useTitle";
import { settings } from "../app/settings";
import Loaders from "../components/loader/Loaders";

export default function Pricingplan() {
  useTitle("Pricing");
  const { plans, error, loading } = usePlans();
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
                  <>
                    {(() => {
                      if (plans?.length > 0) {
                        return plans.map((plan, key) => (
                          <SubsctionPlan key={key} plan={plan} />
                        ));
                      }
                    })()}
                  </>
                ) : (
                  <Loaders />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubsctionPlan({ plan = {} }) {
  const __id = plan?.id || 0;
  const name = plan?.name || "plan name";
  const price = plan?.price || "0";
  const monthly = plan?.billing_cycle || "monthly";
  const words = plan?.words || 0;
  const image = plan?.image || 0;

  return (
    <div className="col-md-4 col-sm-12">
      <div className="pt-2 mb-7 prices-responsive">
        <div className="card border-0 p-4 pl-5 pr-5 pt-4 card-shadow">
          {/* <span className="plan-featured">Most Popular</span> */}
          <div className="plan mb-2 pb-6" style={{ position: "relative" }}>
            <div
              className="plan-title text-center"
              style={{ textTransform: "uppercase" }}
            >
              {name}
            </div>
            <div className="plan-price">
              <span className="plan-cost text-center mb-0">
                {currencyToSymbol(settings.app_currency)}
                {price}
              </span>
              <span className="fs-12 text-center mb-3">/ {monthly}</span>
            </div>

            <p className="fs-12 text-center mb-3" />
            <ul className="plan-items">
              <li>
                <i className="fa fa-check text-danger"></i> {words} words
              </li>
              <li>
                <i className="fa fa-check text-danger"></i> Words Included:
                Unlimited
              </li>
              <li>
                <i className="fa fa-check text-danger"></i> Images Included:{" "}
                {image}
              </li>
              <li>
                <i className="fa fa-check text-danger"></i> All Templates
              </li>
            </ul>
            <div
              className="text-center"
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
              }}
            >
              <Link
                to={"/checkout/" + __id}
                className="btn btn-primary b-radius-none px-3"
                style={{
                  fontSize: "12px",
                  width: "100%",
                }}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
