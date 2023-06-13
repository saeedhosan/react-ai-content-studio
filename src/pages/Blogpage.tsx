import { useParams } from "react-router-dom";
import usePost from "../api/usePost";
import useTitle from "../hooks/useTitle";

import "../assets/css/nopage.css";
import Footer from "../components/Footer";
import Headers from "../components/headers/Headers";
import Loader from "../components/loader/Loader";
import BlogBody from "./blogs/BlogBody";
import BlogHead from "./blogs/BlogHead";
export default function Blogpage(): JSX.Element {
  const { slug } = useParams();
  const post = usePost(slug || "");
  useTitle(slug || "");
  return (
    <>
      <span
        dangerouslySetInnerHTML={{
          __html: `<style>
          a.nav-link.scroll {
            color: black !important;
          }
          </style>`,
        }}
      ></span>
      <Headers />

      {post ? (
        <>
          <BlogHead title={post?.title || "no title"} />
          <BlogBody
            content={post?.content || "no content"}
            author={post?.author || ""}
            image={post?.image || ""}
            date={post?.date || ""}
          />
        </>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}
