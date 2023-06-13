import { Link } from "react-router-dom";
import { borderRound } from "../../../../app/utils/convert";
import { dpath } from "../../../../app/utils/url";
type Props = {
  balance: number | string;
};
export default function SidebarStatus({ balance }: Props) {
  return (
    <div className="side-progress-position mt-4">
      <div className="inline-flex w-100 text-center">
        <div className="flex w-100">
          <span
            className="fs-12 font-weight-bold br-0"
            id="side-word-notification"
          >
            <i className="fa-solid fa-scroll-old text-yellow mr-2" />
            <span className="text-primary mr-1" id="available-words">
              {balance}
            </span>{" "}
            <span className="text-muted"> words left</span>
          </span>
        </div>
        <Link
          to={`${dpath("/pricing")}`}
          className={
            "btn btn-primary br-0 fs-12 my-4 py-1" + borderRound("round-full")
          }
        >
          <i className="fa-solid fa-circle-bolt mr-3 fs-15  vertical-align-middle" />
          Upgrade
        </Link>
      </div>
    </div>
  );
}
