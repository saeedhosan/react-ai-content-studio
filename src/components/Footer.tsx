import assets from "../api/content/assets";
import footer_section from "../api/content/footer_section";

export default function Footer() {
    const column_1 = footer_section?.content?.column_1;
    const column_2 = footer_section?.content?.column_2;
    const column_3 = footer_section?.content?.column_3;

    const copItems = footer_section?.copyright.items || [];
    return (
        <footer id="welcome-footer">
            <div id="footer" className="container text-center">
                <div className="row">
                    {/* FOOTER TITLE */}
                    <div className="col-md-4 col-sm-12" id="footer-logo">
                        <p className="mb-6 fs-14">{footer_section?.content?.text}</p>
                        <img
                            style={{
                                height: "40px",
                                objectFit: "contain",
                            }}
                            src={assets?.image?.footer_logo || "no logo"}
                            alt="Brand Logo"
                        />
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
                                        {column_1 &&
                                            column_1.items.map((item, k) => (
                                                <li key={k} className="py-2">
                                                    <a href={item?._url}>{item?.name}</a>
                                                </li>
                                            ))}
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
                                                        <a href={item?._url} target="_blank">
                                                            {item?.name}
                                                        </a>
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
                                                        <a href={item?._url} target="_blank">
                                                            {item?.name}
                                                        </a>
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
            <Copyright items={copItems} />
        </footer>
    );
}

type CopyrightProps = {
    author?: string | null;
    author_url?: string | null;
    items: Array<{ name: string; _url: string; slug?: string | null }>;
};

export function Copyright({
    items,
    author = "Saeed Hosan",
    author_url = "https://github.com/saeedhosan",
}: CopyrightProps): JSX.Element {
    const yearofthis: string = new Date().getFullYear().toString();
    return (
        <div id="copyright" className="container">
            <p className="copyright-left">
                Copyright © {yearofthis}{" "}
                <a href={author_url || undefined} target="_blank">
                    {author}
                </a>{" "}
                All rights reserved
            </p>
            <div>
                {items &&
                    items.map((item, k) => (
                        <p className="copyright-right" key={k}>
                            <a href={item?._url} target="_blank" rel="noreferrer">
                                {item?.name}
                            </a>
                            {<span>{item?.slug}</span>}
                        </p>
                    ))}
            </div>
            {/* SCROLL TO TOP */}
            <a href="#top" id="back-to-top">
                <i className="fa fa-angle-double-up" />
            </a>
        </div>
    );
}
