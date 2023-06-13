import { textcontent } from "../../app/content";
import { currencyToSymbol } from "../../app/helper";
import usePlans from "../../app/hooks/usePlans";
import { settings } from "../../app/settings";
import Loaders from "../../pages/loader/Loaders";
import FeaturesHeader from "./FeaturesHeader";

export default function Pricingsection() {
  const { plans } = usePlans();
  return (
    <section id="prices-wrapper">
      <div className="container">
        <FeaturesHeader
          title={textcontent?.pricing_section?.title}
          text={textcontent?.pricing_section?.text}
        />
        {/* END SECTION TITLE */}
        <div className="row">
          <div className="card-body">
            <div className="tabs-menu-body">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="monthly_plans">
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
      </div>
    </section>
  );
}

function SubsctionPlan({ plan = {} }) {
  const __id = plan?.id || 0;
  const name = plan?.name || "plan name";
  const price = plan?.price || "0";
  const monthly = plan?.billing_cycle || "monthly";
  const words = plan?.words || 0;
  const image = plan?.image || 0;
  const defautl_items = [
    words + " words",
    image + " images",
    "All templates",
    "Unlimited access",
    "Full time support",
  ];
  const getItems = (plan_items) => {
    if (!plan_items) {
      return false;
    }
    try {
      return JSON.parse(plan_items);
    } catch (error) {
      return false;
    }
  };

  const items = getItems(plan?.items) ? getItems(plan?.items) : defautl_items;
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
              {items?.length > 0 &&
                items.map((item, key) => (
                  <li key={key}>
                    <i className="fa fa-check text-danger"></i> {item}
                  </li>
                ))}
            </ul>
            <div
              className="text-center"
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
              }}
            >
              <a
                href={
                  settings.app_url +
                  "/" +
                  settings.dashboard_path +
                  "/checkout/" +
                  __id
                }
                className="btn btn-primary b-radius-none px-3"
                style={{
                  fontSize: "12px",
                  width: "100%",
                }}
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
