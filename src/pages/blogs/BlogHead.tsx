export default function BlogHead({ title }: { title: string }): JSX.Element {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-md-12">
          <div className="section-title">
            <div className="text-center mt-9" id="contact-row">
              <div className="title">
                <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
