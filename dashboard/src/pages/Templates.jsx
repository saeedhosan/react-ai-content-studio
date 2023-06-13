import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import templates, {
  categories,
  templates_content,
} from "../app/data/templates";
import { prettyString } from "../app/helper";
import useTitle from "../app/hooks/useTitle";

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Templates() {
  useTitle("Templates");

  const [items, setItems] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    (async () => {
      const filted = templates.filter((elm) => {
        if (category === "all") {
          return elm;
        } else {
          return elm.category === category;
        }
      });
      setItems(filted);
    })();
  }, [category]);

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="card border-0">
          <div className="card-header border-0">
            <div className="mt-4">
              <h4 className="card-title mb-4">
                <i className="fa-solid fa-microchip-ai mr-2 text-primary" />
                {templates_content.title}
              </h4>
              <h6 className="text-muted my-2">{templates_content.text}</h6>
            </div>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs" id="template-filter" role="tablist">
              {categories &&
                categories.map((category, key) => {
                  const active = category === "all" ? " active " : "";
                  return (
                    <li className="nav-item" role="presentation" key={key}>
                      <a
                        onClick={() => setCategory(category)}
                        className={` btn btn-primary ` + active}
                        id={`${category}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#${category}`}
                        type="button"
                        role="tab"
                        aria-controls={category}
                        aria-selected="true"
                      >
                        {prettyString(category)}
                      </a>
                    </li>
                  );
                })}
            </ul>
            <div className="tab-content mt-7">
              {/* LIST OF SOLUTIONS */}
              <div className="row d-flex">
                {items &&
                  items.map((item, key) => (
                    <div key={key} className="col-lg-4 col-md-6 col-sm-12">
                      <Link to={`/template/${item._url}`}>
                        <div
                          className="template"
                          style={{ marginBottom: "3rem" }}
                          // onClick={() => navigateToDocument(item.name)}
                        >
                          <div
                            className="card border-0"
                            id={"asp-templage-card" + key}
                          >
                            <div className="card-body pt-5">
                              <div className="template-title">
                                <i className={"float-left " + item.icon} />
                                <h6 className="mb-2 fs-16 number-font text-center">
                                  {item.name}
                                </h6>
                              </div>
                              <div className="template-info my-6">
                                <p className="fs-12 text-muted text-center">
                                  {item.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
