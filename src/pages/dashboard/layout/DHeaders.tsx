import { Link } from "react-router-dom";
import Select from "react-select";
import template_section from "../../../api/content/template_section";
import { dpath } from "../../../app/utils/url";
import { selectStyle } from "../../../components/customSelect";
import HeaderBrand from "./headers/HeaderBrand";
import HeaderFull from "./headers/HeaderFull";
import HeaderProfile from "./headers/HeaderProfile";

export default function DHeaders() {
  return (
    <>
      <div className="app-header header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <HeaderBrand />
              <HeaderFull />
            </div>
            <div className="d-flex">
              <HeaderSelect />
              <HeaderProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HeaderSelect() {
  const options = template_section.templates.map((item) => {
    return {
      label: (
        <Link
          to={dpath(`/templates/${item._url}`)}
          className="awselect-icon-style mr-3"
        >
          <i className={item.icon}></i> {item.name}
        </Link>
      ),
      value: item._url,
    };
  });
  return (
    <div className="dropdown header-expand">
      <Select
        placeholder="Create Document"
        classNamePrefix={`asc_select`}
        className={"asc_select_main"}
        components={{ IndicatorSeparator: null }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        styles={selectStyle({ width: "220px" })}
        // classNamePrefix="select"
        // getOptionLabel={(e) => log(e)}
        options={options}
      />
    </div>
  );
}
