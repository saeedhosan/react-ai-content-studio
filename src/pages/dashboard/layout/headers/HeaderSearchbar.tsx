export default function HeaderSearchbar() {
  return (
    <div id="search-bar">
      <a className="nav-link icon">
        <form id="search-field" method="POST" encType="multipart/form-data">
          <input type="search" name="keyword" />
        </form>
      </a>
    </div>
  );
}
