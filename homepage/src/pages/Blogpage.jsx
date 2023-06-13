import { useParams } from "react-router-dom";
import BlogBody from "./blogs/BlogBody";
import BlogHead from "./blogs/BlogHead";

import Footer from "../components/Footer";
import Headers from "../components/headers/Headers";

import usePostbyurl from "../app/hooks/usePostbyurl";
import useTitle from "../app/hooks/useTitle";
import { navLinkcss } from "./blogs/customize.css.jsx";
import Loaders from "./loader/Loaders";

export default function Blogpage() {
  const { post_url } = useParams();
  const { get_post } = usePostbyurl(post_url);
  useTitle(get_post?.post_title || "");
  if (get_post) {
    return (
      <>
        <span
          dangerouslySetInnerHTML={{
            __html: navLinkcss,
          }}
        ></span>
        <Headers />
        <BlogHead title={get_post?.post_title} />
        <BlogBody
          content={get_post?.post_content}
          author={get_post?.author_meta?.display_name}
          date={get_post?.post_date}
          image={get_post?.featured_image}
        />
        <Footer />
      </>
    );
  } else {
    return <Loaders />;
  }
}
