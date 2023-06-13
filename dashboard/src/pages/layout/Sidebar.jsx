import PerfectScrollbar from "perfect-scrollbar";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useSubscription from "../../app/hooks/useSubscription";
import SidebarLogo from "./sidebar/SidebarLogo";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Sidebar() {
  const { pathname } = useLocation();
  const { subscription } = useSubscription();
  useEffect(() => {
    //P-scrolling
    let ps;
    // if (ps) ps = null;
    ps = new PerfectScrollbar(".app-sidebar", {
      useBothWheelAxes: true,
      suppressScrollX: true,
    });
    return () => ps;
  }, []);

  const isActive = (name) =>
    name === pathname.replace(/^\//g, "") ? true : false;

  return (
    <>
      <aside className="app-sidebar">
        <SidebarLogo />
        <ul className="side-menu app-sidebar3">
          <SidebarStatus balance={subscription?.words} />
          <SidebarList
            active={isActive("dashboard")}
            name="Dashboard"
            icon="lead-3 fa-solid fa-chart-tree-map"
            url="dashboard"
          />

          <SidebarList
            active={isActive("templates")}
            name="Templates"
            icon="fa-solid fa-microchip-ai"
            url="templates"
          />

          <SidebarList
            active={isActive("documents")}
            name="Documents"
            icon="fa-solid fa-folder-bookmark"
            url="documents"
          />

          <SidebarList
            active={isActive("images")}
            name="AI Images"
            url={"images"}
            icon="lead-3 fa-solid fa-camera-viewfinder"
          />

          <hr className="w-90 text-center m-auto" />

          <SidebarList
            active={isActive("plans")}
            name="Pricing Plans"
            url={"plans"}
            icon="fa-solid fa-box-circle-check"
          />
          <SidebarList
            active={isActive("support")}
            name="Support Requests"
            url={"support"}
            icon="fa-solid fa-messages-question"
          />
        </ul>
      </aside>
    </>
  );
}

function SidebarList({ name = "name", url = "#", icon, active, children }) {
  const isActive = active ? "  " : "";
  return (
    <li className="slide">
      <Link
        className={"side-menu__item " + isActive}
        data-toggle="slide"
        to={url}
      >
        <span className={"side-menu__icon " + icon} />
        <span className="side-menu__label">{name}</span>
        {children && <i className="angle fa fa-angle-right" />}
      </Link>
      {children && <ul className="slide-menu">{children}</ul>}
    </li>
  );
}

function SidebarStatus({ balance = 0, upgrade }) {
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
        <Link to="/plans" className="btn btn-primary br-0 fs-12 my-4 py-1">
          {/* <i className="fa-solid fa-circle-bolt mr-3 fs-15  vertical-align-middle" /> */}
          Upgrade
        </Link>
      </div>
    </div>
  );
}
// function SidebarList({ name = "name", url = "#" }) {
//   return (
//     <li className="slide">
//       <a className="side-menu__item" href="https://write4me.co/user/support">
//         <span className="side-menu__icon fa-solid fa-messages-question" />
//         <span className="side-menu__label">Support Requests</span>
//       </a>
//     </li>
//   );
// }
