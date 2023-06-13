import templates from "../../app/data/templates";
import { seoToString } from "../../app/helper";
import useSubscription from "../../app/hooks/useSubscription";
/**
 *
 * this componets is not current using
 */
export default function DocsForm({
  title = "blogs",
  text = "about blog for shorly",
  icon = "fa-solid fa-copyright web-icon",
}) {
  const { subscription } = useSubscription();
  const _title = seoToString(title);
  const search = templates.find((arr) => arr._url === title);
  return (
    <div className="col-lg-4 col-md-12 col-sm-12">
      <div className="card border-0" id="template-input">
        <div className="card-body p-5 pb-0">
          <div className="row">
            <div className="template-view">
              <div className="template-icon mb-2 d-flex">
                <i className={search ? search.icon : icon} />
                <div>
                  <h6 className="mt-1 ml-3 fs-16 number-font">{_title}</h6>
                </div>
              </div>
              <div className="template-info">
                <p className="fs-12 text-muted mb-4">
                  {search ? search.text : text}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="text-left mb-4" id="balance-status">
                <span className="fs-11 text-muted pl-3">
                  <i className="fa-sharp fa-solid fa-bolt-lightning mr-2 text-primary" />
                  Your Balance is{" "}
                  <span className="font-weight-semibold" id="balance-number">
                    {subscription && subscription?.words}
                  </span>{" "}
                  Words
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="input-box">
                <h6 className="fs-11 mb-2 font-weight-semibold">
                  Product name{" "}
                  <span className="text-required">
                    <i className="fa-solid fa-asterisk" />
                  </span>
                </h6>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control "
                    id="title"
                    name="title"
                    placeholder="e.g. VR, Toy"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="input-box">
                <h6 className="fs-11 mb-2 font-weight-semibold">
                  Audience{" "}
                  <span className="text-required">
                    <i className="fa-solid fa-asterisk" />
                  </span>
                </h6>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control "
                    id="audience"
                    name="audience"
                    placeholder="e.g. Freelances, Developers"
                    required=""
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="input-box">
                <h6 className="fs-11 mb-2 font-weight-semibold">
                  Product Description{" "}
                  <span className="text-required">
                    <i className="fa-solid fa-asterisk" />
                  </span>
                </h6>
                <div className="form-group">
                  <textarea
                    type="text"
                    rows={5}
                    className="form-control "
                    id="description"
                    name="description"
                    placeholder="e.g. VR is an innovative device that can allow you to be part of virtual world"
                    required=""
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div id="form-group">
                <h6 className="fs-11 mb-2 font-weight-semibold">
                  Creativity{" "}
                  <i
                    className="ml-1 text-dark fs-12 fa-solid fa-circle-info"
                    data-tippy-content="Increase or decrease the creativity level to get various results"
                  />
                </h6>
                <select
                  id="creativity"
                  name="creativity"
                  data-placeholder="Select creativity level"
                  defaultValue={0}
                >
                  <option value={0}>Low</option>
                  <option value="0.5"> Average</option>
                  <option value={1}> High</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div id="form-group">
                <h6 className="fs-11 mb-2 font-weight-semibold">
                  Number of Results{" "}
                  <i
                    className="ml-1 text-dark fs-12 fa-solid fa-circle-info"
                    data-tippy-content="Maximum supported results is 5"
                  />
                </h6>
                <select
                  id="max-results"
                  name="max_results"
                  data-placeholder="Set max number of results"
                  defaultValue={"1"}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="input-box">
                <h6 className="fs-11 mb-2 font-weight-semibold">
                  Max Result Length{" "}
                  <i
                    className="ml-1 text-dark fs-12 fa-solid fa-circle-info"
                    data-tippy-content="Maximum words for each generated text result. Maximum allowed length is 1000"
                  />
                </h6>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control "
                    id="words"
                    name="words"
                    placeholder="e.g. 100"
                    max={1000}
                    defaultValue={200}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer border-0 text-center p-0">
            <div className="w-100 pt-2 pb-2">
              <div className="text-center">
                <span id="processing" className="processing-image">
                  <img src="https://write4me.co/img/svgs/upgrade.svg" alt="" />
                </span>
                <button
                  type="submit"
                  name="submit"
                  className="btn btn-primary  pl-7 pr-7 fs-11 pt-2 pb-2"
                  id="generate"
                >
                  Generate Text
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
