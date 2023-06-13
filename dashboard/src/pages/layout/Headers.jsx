/* eslint-disable jsx-a11y/anchor-is-valid */
import Select from "react-select";
import templates from "../../app/data/templates";
import { selectStyle } from "../../app/select/customStyle";
// import templates from "../../app/select/templates";
import { Link } from "react-router-dom";
import HeaderBrand from "./headers/HeaderBrand";
import HeaderFull from "./headers/HeaderFull";
import HeaderProfile from "./headers/HeaderProfile";

export default function Headers() {
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
  const options = templates.map((item) => {
    return {
      label: (
        <Link
          to={`/template/${item._url}`}
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
        components={{ IndicatorSeparator: null }}
        styles={selectStyle({ width: "220px" })}
        // classNamePrefix="select"
        // getOptionLabel={(e) => log(e)}
        options={options}
      />
    </div>
  );
}
