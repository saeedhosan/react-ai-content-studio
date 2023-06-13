import { Route, Routes } from "react-router-dom";
import ALLImages from "./pages/ALLImages";
import Archivedocs from "./pages/Archivedocs";
import Checkoutpage from "./pages/Checkoutpage";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Layout from "./pages/layout/Layout";
import Pricingplan from "./pages/Pricingplan";
import Purchasepage from "./pages/Purchasepage";
import SupportCreate from "./pages/SupportCreate";
import Supportpage from "./pages/Supportpage";
import Template from "./pages/Template";
import Templates from "./pages/Templates";

export default function Router() {
  return (
    <div className="main-content">
      <div className="side-app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="archive/:docs_id" element={<Archivedocs />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="template/:title" element={<Template />} />
            <Route path="documents" element={<Documents />} />
            <Route path="images" element={<ALLImages />} />
            <Route path="plans" element={<Pricingplan />} />
            <Route path="support" element={<Supportpage />} />
            <Route path="checkout/:plan_id" element={<Checkoutpage />} />
            <Route path="support/create" element={<SupportCreate />} />
            <Route path="purchase" element={<Purchasepage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
