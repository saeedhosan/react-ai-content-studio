/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useAuth } from "../app/context/AuthContext";
import templates from "../app/data/templates";
import { avatar } from "../app/helper";
import useDashboard from "../app/hooks/useDashboard";
import useTitle from "../app/hooks/useTitle";
import ChartsBox from "../components/ChartsBox";
import Loaders from "../components/loader/Loaders";

export default function Dashboard() {
  useTitle("Dashboard");
  return (
    <div className="row">
      <ProfileTab />
      <TemplateTabs />
      <ChartsTab />
    </div>
  );
}

function ProfileTab() {
  const { user } = useAuth();
  const { dasboard } = useDashboard();
  const plan = dasboard?.plan;
  return (
    <div className="col-xl-4 col-lg-4 col-md-2 col-md-12">
      {user ? (
        <div className="card border-0 pb-6">
          <div className="card-body text-center">
            <div className="row no-gutters">
              <div className="col-md-12 col-sm-12">
                <div className="widget-user-image overflow-hidden mx-auto mt-3 mb-4">
                  <img
                    alt="User Avatar"
                    className="rounded-circle"
                    src={
                      user?.data?.image
                        ? user?.data?.image
                        : avatar(user?.data?.display_name)
                    }
                  />
                </div>
                <h4 className="mb-2 mt-2 font-weight-800 fs-16 text-primary text-shadow">
                  {user?.data?.display_name}
                </h4>
              </div>
              <div className="col-md-12 col-sm-12">
                <div className="d-flex w-100">
                  <div className="flex w-100">
                    <h4 className="mb-3 mt-4 font-weight-800 text-primary text-shadow fs-16">
                      {dasboard?.subscription?.words || 0} / {plan?.words || 0}
                    </h4>
                    <h6 className="fs-12 mb-4 text-shadow">Words Left</h6>
                  </div>
                  <div className="flex w-100">
                    <h4 className="mb-3 mt-4 font-weight-800 text-primary text-shadow fs-16">
                      {dasboard?.subscription?.image || 0} / {plan?.image || 0}
                    </h4>
                    <h6 className="fs-12 mb-4 text-shadow">Images Left</h6>
                  </div>
                </div>
                {/* <span className=" fs-10 btn btn-cancel-black w-100 mt-6">
                  <i className="fa-sharp fa-solid fa-gifts text-yellow mr-2" />
                  {dasboard?.subscription?.plan?.name}
                </span> */}
                <br />
                <Link to="/plans" className="btn btn-primary w-100 mt-2">
                  <i className="fa-solid fa-hand-holding-box mr-2" />
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loaders />
      )}
    </div>
  );
}

function TemplateTabs() {
  const { dasboard } = useDashboard();
  return (
    <div className="col-xl-8 col-lg-8 col-md-12">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Documents Created{" "}
                      <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {dasboard?.created_docs}{" "}
                      <span className="text-muted fs-18">Documents</span>
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-folder-grid" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Words Generated <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {dasboard?.word_used}{" "}
                      <span className="text-muted fs-18">words</span>
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-scroll-old" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Images Created <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {dasboard?.images}{" "}
                      <span className="text-muted fs-18">images</span>
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-image-landscape" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card overflow-hidden border-0">
                <div className="card-body d-flex">
                  <div className="usage-info w-100">
                    <p className=" mb-3 fs-12 font-weight-bold">
                      Templates Used <span className="text-muted">(ALL)</span>
                    </p>
                    <h2 className="mb-2 number-font fs-20">
                      {dasboard?.template_used} / {templates?.length}
                    </h2>
                  </div>
                  <div className="usage-icon w-100 text-right">
                    <i className="fa-solid fa-cloud-word" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartsTab() {
  const { dasboard } = useDashboard();
  const document_chars = dasboard?.document_chars;
  return (
    <div className="col-lg-12 col-md-12 col-xm-12">
      <div className="card border-0">
        <div className="card-header border-0">
          <div className="mt-3">
            <h3 className="card-title mb-2">
              <i className="fa-solid fa-scroll-old mr-2 text-info" />
              Word Generation <span className="text-muted">(ALL)</span>
            </h3>
            <h6 className="text-muted">
              Monitor your daily word generation closely
            </h6>
          </div>
        </div>
        <div className="card-body pt-2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {document_chars ? (
                <ChartsBox data={document_chars} />
              ) : (
                <Loaders />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
