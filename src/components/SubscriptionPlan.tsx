import { Link } from "react-router-dom";
import plan_section from "../api/content/plan_section";
import { borderRound, currencyToSymbol } from "../app/utils/convert";
import { dpath } from "../app/utils/url";

export function SubsctionPlan({ plan }: { plan: typeof plan_section.plans[0] }) {
  const defautl_items = [
    "0 words",
    "0 images",
    "All templates",
    "Unlimited access",
    "Full time support",
  ];

  const items = plan?.items ? JSON.parse(plan?.items) : defautl_items;
  return (
    <div className="col-md-4 col-sm-12">
      <div className="pt-2 mb-7 prices-responsive">
        <div
          className={`card border-0 p-4 pl-5 pr-5 pt-4 card-shadow ${borderRound(
            "round-10px"
          )}`}
        >
          {/* <span className="plan-featured">Most Popular</span> */}
          <div className="plan mb-2 pb-6" style={{ position: "relative" }}>
            <div
              className="plan-title text-center"
              style={{ textTransform: "uppercase" }}
            >
              {plan?.name || "plan_name"}
            </div>
            <div className="plan-price">
              <span className="plan-cost text-center mb-0">
                {currencyToSymbol("USD")}
                {plan?.price || 0}
              </span>
              <span className="fs-12 text-center mb-3">
                / {plan?.billing_cycle}
              </span>
            </div>

            <p className="fs-12 text-center mb-3" />
            <ul className="plan-items">
              {items?.length > 0 &&
                items.map((item: string, _k: number) => (
                  <li key={_k}>
                    <i
                      className="fa fa-check"
                      style={{ color: `var(--primary)` }}
                    ></i>{" "}
                    {item}
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
              <Link
                to={dpath(`/checkout/${plan.id}`)}
                className={`btn btn-primary px-3 ${borderRound("round-full")}`}
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
