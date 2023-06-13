export default function HeaderFull() {
  return (
    <div
      className="app-sidebar__toggle nav-link icon ml-0 pl-0"
      data-toggle="sidebar"
    >
      <a
        className="open-toggle"
        onClick={(e) => {
          e.preventDefault();
        }}
        href="#ful"
      >
        <span className="fa fa-align-left header-icon" />
      </a>
    </div>
  );
}
