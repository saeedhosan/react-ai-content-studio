import { Outlet } from "react-router-dom";
import DFooter from "../../../components/dashboard/DFooter";
import Headers from "./DHeaders";
import Sidebar from "./Sidebar";
export default function Layout() {
  return (
    <>
      <Sidebar />
      <div className="app-content main-content">
        <div className="side-app">
          {/* TOP MENU BAR */}
          <Headers />
          {/* END TOP MENU BAR */}
          <Outlet />
        </div>
      </div>

      <DFooter />
    </>
  );
}
