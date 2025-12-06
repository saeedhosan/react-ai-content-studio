import { useMemo } from "react";
import useDashboard from "../../api/useDashboard";
import { borderRound } from "../../app/utils/convert";
import { getAuthSession } from "../../app/utils/storage";
import useTitle from "../../hooks/useTitle";

export default function Affiliate() {
  useTitle("Affiliate Program");
  const dashboard = useDashboard();
  const user = getAuthSession();

  const referralLink = useMemo(() => {
    const host =
      typeof window !== "undefined" ? window.location.origin : "https://example.com";
    const code = user?.username || user?.nickname || "your-ref";
    return `${host}/signup?ref=${encodeURIComponent(code)}`;
  }, [user?.nickname, user?.username]);

  return (
    <div className="row">
      <div className="col-lg-8 col-md-12">
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title mb-0">
              <i className="fa-solid fa-badge-dollar mr-2 text-success" />
              Affiliate Program
            </h3>
            <p className="text-muted fs-12 mb-0">
              Invite users and earn a commission on their subscriptions. Share your link
              below to get started.
            </p>
          </div>
          <div className="card-body pt-2">
            <div className="mb-4">
              <label className="fs-12 font-weight-bold text-uppercase text-muted">
                Your referral link
              </label>
              <div className="input-group">
                <input
                  readOnly
                  value={referralLink}
                  className={`form-control ${borderRound("round-full")}`}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className={`btn btn-primary ${borderRound("round-full")}`}
                    onClick={() => {
                      navigator.clipboard
                        ?.writeText(referralLink)
                        .then(() => null)
                        .catch(() => null);
                    }}
                  >
                    <i className="fa-solid fa-copy mr-1" />
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card border-0 shadow-none p-3 h-100">
                  <div className="d-flex align-items-center mb-3">
                    <span className="avatar avatar-md bg-primary-transparent mr-3">
                      <i className="fa-solid fa-user-plus text-primary" />
                    </span>
                    <div>
                      <h6 className="mb-0">Invite friends</h6>
                      <p className="text-muted fs-12 mb-0">
                        Share the link anywhere you engage: newsletters, socials, or DMs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-none p-3 h-100">
                  <div className="d-flex align-items-center mb-3">
                    <span className="avatar avatar-md bg-success-transparent mr-3">
                      <i className="fa-solid fa-badge-dollar text-success" />
                    </span>
                    <div>
                      <h6 className="mb-0">Earn rewards</h6>
                      <p className="text-muted fs-12 mb-0">
                        You earn a share of each paid plan started from your referrals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-12">
        <div className="card border-0">
          <div className="card-header border-0">
            <h3 className="card-title mb-0">Snapshot</h3>
            <p className="text-muted fs-12 mb-0">Current plan and usage at a glance.</p>
          </div>
          <div className="card-body pt-2">
            <div className="mb-3">
              <p className="text-muted fs-12 mb-1">Plan</p>
              <h6 className="font-weight-800 mb-0">
                {dashboard?.active_plan?.name || "No active plan"}
              </h6>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted fs-12">Words left</span>
              <span className="font-weight-800">
                {dashboard?.subscription?.words ?? 0} / {dashboard?.active_plan?.words ?? 0}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted fs-12">Images left</span>
              <span className="font-weight-800">
                {dashboard?.subscription?.image ?? 0} / {dashboard?.active_plan?.image ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
