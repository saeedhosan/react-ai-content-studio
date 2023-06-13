export default function Tablepagination() {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info"
          id="resultsTable_info"
          role="status"
          aria-live="polite"
        >
          Showing 1 to 1 of 1 entries
        </div>
      </div>
      <div className="col-sm-12 col-md-7">
        <div className="dataTables_paginate paging_full_numbers">
          <ul className="pagination">
            <li className="paginate_button page-item first">
              <a className="page-link">
                <i className="fa fa-angle-double-left" />
              </a>
            </li>
            <li className="paginate_button page-item previous">
              <a className="page-link">
                <i className="fa fa-angle-left" />
              </a>
            </li>
            <li className="paginate_button page-item active">
              <a className="page-link">1</a>
            </li>
            <li className="paginate_button page-item next disabled_">
              <a className="page-link">
                <i className="fa fa-angle-right" />
              </a>
            </li>
            <li className="paginate_button page-item last">
              <a className="page-link">
                <i className="fa fa-angle-double-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
