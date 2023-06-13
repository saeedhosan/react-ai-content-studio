import { dbTodate, dbTotime } from "../../app/utils/datetime";

type Props = {
  content: string;
  author: string;
  image: string | null | false;
  date: string;
};
export default function BlogBody({ content, author, image, date }: Props) {
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
                {dbTodate(date)} {dbTotime(date)}
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
