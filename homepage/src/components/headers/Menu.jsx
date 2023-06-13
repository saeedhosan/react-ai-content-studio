export default function Menu({ children }) {
  return (
    <section id="main-wrapper">
      <div className="relative flex items-top justify-center min-h-screen">
        <div className="container-fluid fixed-top" id="navbar-container">
          <div className="container">
            <div className="row">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
