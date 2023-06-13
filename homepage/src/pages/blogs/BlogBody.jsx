export default function ({
  content = "empty",
  author = "admin",
  image = "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  date = "10 04, 1999",
}) {
  const time = new Date(date);
  const post_date = time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <section id="blog-wrapper">
      <div className="container pt-6">
        <div className="row justify-content-md-center">
          <div className="col-md-12 col-sm-12">
            {image && (
              <div className="blog">
                <img style={{ width: "100%" }} src={image} alt="Blog Image" />
              </div>
            )}
            <p className="fs-12 text-center text-muted mb-5">
              <span>
                <i className="mdi mdi-account-edit mr-1" />
                {author}
              </span>{" "}
              /{" "}
              <span>
                <i className="mdi mdi-alarm mr-1" />
                {post_date}
              </span>
            </p>
            <div
              className="fs-14"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
