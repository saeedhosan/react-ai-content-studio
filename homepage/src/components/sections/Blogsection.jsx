/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import usePosts from "../../app/hooks/usePosts";

function NextArrow(props) {
  // eslint-disable-next-line no-unused-vars
  const { className, style, onClick } = props;
  return (
    <div className="blogs-nav">
      <a className="blogs-next" onClick={onClick}>
        <i className="fa fa-chevron-right" />
      </a>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="blogs-nav">
      <a className="blogs-prev" onClick={onClick}>
        <i className="fa fa-chevron-left" />
      </a>
    </div>
  );
}
export default function Blogsection() {
  const { posts } = usePosts();

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img style={{ width: "100%", height: "100%" }} src={posts[i].image} />
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 3,
    // autoplay: true,
    // autoplaySpeed: 4000,
    // ///// cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const readmore = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineHeight: "21px",
    height: "48px",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };
  return (
    <section id="blog-wrapper">
      <div className="container text-center">
        <Blogsectiontitle />
        {posts && (
          <Slider {...settings}>
            {posts.map((post, key) => (
              <div
                key={key}
                className="blog"
                data-aos="zoom-in"
                data-aos-delay={500}
                data-aos-once="true"
                data-aos-duration={1000}
              >
                <div className="blog-box">
                  <div className="blog-img">
                    <Link to={post.slug}>
                      <img
                        src={
                          post.featured_media || "https://placehold.co/1000x600"
                        }
                        alt="Blog Image"
                      />
                    </Link>
                  </div>
                  <div className="blog-info">
                    <h6 className="blog-date text-left text-muted mt-3 pt-1 mb-4">
                      <span className="mr-2">Admin</span> |{" "}
                      <i className="mdi mdi-alarm mr-2" />
                      14 March 2023
                    </h6>
                    <h5
                      className="blog-title fs-16 text-left mb-3"
                      style={readmore}
                    >
                      {post?.title?.rendered}
                    </h5>
                    <p
                      style={readmore}
                      dangerouslySetInnerHTML={{
                        __html: post?.excerpt?.rendered,
                      }}
                      className="blog-date fs-12 text-muted text-left mb-3"
                    ></p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
        {/* <BlogsectionNav /> */}
      </div>
    </section>
  );
}

function Blogsectiontitle() {
  return (
    <div className="row mb-8 mt-5">
      <div className="title w-100">
        <h6>
          <span>Latest</span> Blogs
        </h6>
        <p>
          Read our unique blog articles about various data archiving solutions
          and secrets
        </p>
      </div>
    </div>
  );
}
