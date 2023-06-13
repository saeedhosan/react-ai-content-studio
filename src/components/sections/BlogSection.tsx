import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import pagespath from "../../api/pagespath";
import usePosts from "../../api/usePosts";
import { borderRound } from "../../app/utils/convert";
import { dbTodate, dbTotime } from "../../app/utils/datetime";
import { removeHtml, strLooks } from "../../app/utils/str";
import FeaturesHeader from "../FeaturesHeader";
import Loader from "../loader/Loader";

type ArrowType = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

function NextArrow({ onClick }: ArrowType): JSX.Element {
  // const { className, style, onClick } = props;
  return (
    <div className="blogs-nav">
      <a className="blogs-next" onClick={onClick}>
        <i className="fa fa-chevron-right" />
      </a>
    </div>
  );
}

function PrevArrow(props: ArrowType): JSX.Element {
  const { onClick } = props;
  return (
    <div className="blogs-nav">
      <a className="blogs-prev" onClick={onClick}>
        <i className="fa fa-chevron-left" />
      </a>
    </div>
  );
}
export default function BlogSection() {
  const posts = usePosts();
  const settings = {
    customPaging: function (i: number) {
      const image = (posts && posts[i].image) || "https://placehold.co/600";
      return (
        <a>
          <img
            className={borderRound("round-full")}
            style={{
              width: "100%",
              height: "100%",
            }}
            src={image.toString()}
          />
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 3,
    autoplay: true,
    autoplaySpeed: 4000,
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
  };
  return (
    <section id="blog-wrapper">
      <div className="container text-center">
        <FeaturesHeader title="Latest posts" text="See our latest posts" />
        {posts ? (
          <Slider {...settings}>
            {posts.map((post, key) => (
              <div
                key={key}
                className="blog px-1"
                data-aos="zoom-in"
                data-aos-delay={500}
                data-aos-once="true"
                data-aos-duration={1000}
              >
                <div className={`blog-box  ${borderRound("round-10px")}`}>
                  <div className="blog-img">
                    <Link to={`${pagespath.blog}/${post?.slug}`}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={post?.image || "https://placehold.co/1000x600"}
                        alt="Blog Image"
                      />
                    </Link>
                  </div>
                  <div className="blog-info">
                    <h6 className="blog-status fs-14 text-left mt-3 pt-1 mb-4">
                      <span className="mr-2">
                        <i className="fa-solid fa-user text-primary"></i>{" "}
                        <b>{strLooks(post?.author || "")}</b>
                      </span>{" "}
                      | <i className="mdi mdi-alarm mr-2" />
                      {dbTodate(post?.date || "")} {dbTotime(post?.date || "")}
                    </h6>
                    <Link to={`${pagespath.blog}/${post?.slug}`}>
                      <h5
                        className="blog-title fs-16 text-left mb-3"
                        style={readmore}
                        dangerouslySetInnerHTML={{ __html: post?.title || "" }}
                      ></h5>
                    </Link>
                    <p
                      style={readmore}
                      className="blog-date fs-12 text-muted text-left mb-3"
                    >
                      {removeHtml(post?.content || "")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
