import { textcontent } from "../app/content";
import usePages from "../app/hooks/usePages";
import usePosts from "../app/hooks/usePosts";
import { settings } from "../app/settings";

export default function Footer() {
  const { posts } = usePosts();
  const { pages } = usePages();
  const column_1 = textcontent.footer_section?.column_1;
  const column_2 = textcontent.footer_section?.column_2;
  const column_3 = textcontent.footer_section?.column_3;
  return (
    <footer id="welcome-footer">
      <div id="footer" className="container text-center">
        <div className="row">
          {/* FOOTER TITLE */}
          <div className="col-md-4 col-sm-12" id="footer-logo">
            <img
              src={textcontent?.footer_section.app_logo || settings.app_icon}
              alt="Brand Logo"
            />
            <p className="mb-0 mt-4 fs-12">
              {textcontent.footer_section?.text}
            </p>
            <div className="dropdown header-locale" id="frontend-local">
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow animated">
                <div className="local-menu">
                  <a
                    href={settings.app_url + "es"}
                    className="dropdown-item d-flex"
                  >
                    <div className="text-info">
                      <i className="flag flag-es mr-3" />
                    </div>
                    <div>
                      <span className="font-weight-normal fs-12">Español</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* END FOOTER TITLE & SOCIAL ICONS */}
          {/* FOOTER LINKS */}
          <div className="col-md-8 col-sm-12" id="footer-links">
            <div className="row w-100">
              {/* column 1 */}
              {column_1 && (
                <div className="col-md-4 col-sm-12">
                  <h5>{column_1?.title || "Site pages"}</h5>
                  <ul className="list-unstyled">
                    {(() => {
                      if (typeof column_1?.items === "object") {
                        return column_1.items.map((item, k) => (
                          <li key={k} className="py-2">
                            <a href={item?._url}>{item?.name}</a>
                          </li>
                        ));
                      } else {
                        return (
                          pages &&
                          pages?.slice(0, 4).map((post, key) => (
                            <li key={key} className="py-2">
                              <a href={post?.slug}>{post?.title?.rendered}</a>
                            </li>
                          ))
                        );
                      }
                    })()}
                  </ul>
                </div>
              )}
              {/* column 1 */}
              {/* column 2 */}
              {column_2 && (
                <div className="col-md-4 col-sm-12">
                  <h5>{column_2?.title || "Site pages"}</h5>
                  <ul className="list-unstyled">
                    {(() => {
                      if (typeof column_2?.items === "object") {
                        return column_2.items.map((item, k) => (
                          <li key={k} className="py-2">
                            <a href={item?._url}>{item?.name}</a>
                          </li>
                        ));
                      } else {
                        return null;
                      }
                    })()}
                  </ul>
                </div>
              )}
              {/* column 2 */}
              {/* column 3 */}
              {column_3 && (
                <div className="col-md-4 col-sm-12">
                  <h5>{column_3?.title || "latest posts"}</h5>
                  <ul className="list-unstyled">
                    {(() => {
                      if (typeof column_3?.items === "object") {
                        return column_3.items.map((item, k) => (
                          <li key={k} className="py-2">
                            <a href={item?._url}>{item?.name}</a>
                          </li>
                        ));
                      } else {
                        return null;
                      }
                    })()}
                  </ul>
                </div>
              )}
              {/* column 3 */}
            </div>
          </div>{" "}
          {/* END FOOTER LINKS */}
        </div>{" "}
        {/* END ROW */}
      </div>{" "}
      <Copyright />
    </footer>
  );
}

function Copyright() {
  const copyright = textcontent.footer_section?.copyright;
  return (
    <div id="copyright" className="container">
      <p className="copyright-left">
        Copyright © {new Date().getFullYear()}{" "}
        <a href={settings.app_url}>{settings.app_name}</a> All rights reserved
      </p>
      <div>
        {(() => {
          if (typeof copyright?.items === "object") {
            return copyright.items.map((item, k) => (
              <p className="copyright-right">
                <a href={item?._url} target="_blank" rel="noreferrer">
                  {item?.name}
                </a>
                {<span>{item?.slug}</span>}
              </p>
            ));
          }
          return null;
        })()}
      </div>
      {/* SCROLL TO TOP */}
      <a href="#top" id="back-to-top">
        <i className="fa fa-angle-double-up" />
      </a>
    </div>
  );
}
