import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import template_section from "../../api/content/template_section";
import { dpath } from "../../app/utils/url";
import FilterButtons from "../../components/dashboard/FilterButtons";
import useTitle from "../../hooks/useTitle";

export default function DTemplates() {
  useTitle("Templates");
  const templates = template_section.templates;
  const [items, setItems] = useState(templates);
  const [active, setActive] = useState("all");
  const categories = template_section.categories;

  const handleCategoryClick = (category: string): void => {
    if (category === active) return;
    setActive(category);
    setItems([]);

    if (category === "all") {
      setItems(templates);
      return;
    }

    const filteredData = templates.filter((item) => item.category === category);
    setTimeout(() => {
      setItems(filteredData);
    }, 200);
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="card border-0">
          <div className="card-header border-0">
            <div className="mt-4">
              <h4 className="card-title mb-4">
                <i className="fa-solid fa-microchip-ai mr-2 text-primary" />
                {template_section.content.title}
              </h4>
              <h6 className="text-muted my-2">
                {template_section.content.text}
              </h6>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex  py-4">
              <FilterButtons
                handleClick={handleCategoryClick}
                active={active}
                categories={categories}
              />
            </div>
            <div className="tab-content mt-7">
              <div className="row d-flex">
                <AnimatePresence>
                  {items &&
                    items.map((item, key) => (
                      <motion.div
                        key={key}
                        className="col-lg-4 col-md-6 col-sm-12"
                        layout
                        initial={{ transform: "scale(0)" }}
                        animate={{ transform: "scale(1)" }}
                        exit={{ transform: "scale(0)" }}
                      >
                        <Link to={dpath(`/templates/${item._url}`)}>
                          <div
                            className="template"
                            style={{ marginBottom: "3rem" }}
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
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
