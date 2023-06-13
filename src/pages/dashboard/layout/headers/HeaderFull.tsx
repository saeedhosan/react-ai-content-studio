export default function HeaderFull() {
  return (
    <div
      id="sidebar_toggle"
      className="app-sidebar__toggle nav-link icon ml-0 pl-0"
      data-toggle="sidebar"
      style={{ cursor: "pointer" }}
    >
      <a className="open-toggle">
        <span className="fa fa-align-left header-icon" />
      </a>
    </div>
  );
}
