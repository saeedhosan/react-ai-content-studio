/* eslint-disable jsx-a11y/anchor-is-valid */
export default function HeaderSearchbar() {
  return (
    <div id="search-bar">
      <div>
        <a className="nav-link icon">
          <form id="search-field" method="POST" encType="multipart/form-data">
            <input type="search" name="keyword" />
          </form>
        </a>
      </div>
    </div>
  );
}
