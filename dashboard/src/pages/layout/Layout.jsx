/* eslint-disable jsx-a11y/anchor-is-valid */

import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Headers from "./Headers";
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

      <Footer />
    </>
  );
}
