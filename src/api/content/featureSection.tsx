import settings from "../../app/settings";
import featureimage1 from "../../assets/images/feature-01.png";
import featureimage2 from "../../assets/images/feature-02.png";
import featureimage3 from "../../assets/images/feature-03.png";
import featureimage4 from "../../assets/images/feature-04.png";
import featureimage5 from "../../assets/images/feature-05.png";
import featureimage6 from "../../assets/images/feature-06.png";
export default {
  content: {
    title: `${settings.app_name} Overview`,
    text: `${settings.app_name} creates premium content for you in seconds.`,
    bg_image: "",
    bg_color: "",
  },
  features: [
    {
      name: "PREMIUM QUALITY CONTENT",
      content: "Amazing content in seconds.",
      box_theme: "light",
      image: featureimage1,
      aos: {
        zoom: "zoom-in",
        delay: 400,
        once: true,
        duration: 700,
      },
    },
    {
      name: "ACCURATE AND FAST",
      content: "Engaging and precise writing.",
      box_theme: "dark",
      image: featureimage2,
      aos: {
        zoom: "zoom-in",
        delay: 400,
        once: true,
        duration: 700,
      },
    },
    {
      name: "COST EFFECTIVE",
      content: "Extremely affordable, premium content.",
      box_theme: "dark",
      image: featureimage3,
      aos: {
        zoom: "zoom-in",
        delay: 400,
        once: true,
        duration: 700,
      },
    },
    {
      name: "CREATIVE CONTENT IDEAS",
      content: "Never suffer from writer's block again.",
      box_theme: "light",
      image: featureimage4,
      aos: {
        zoom: "zoom-in",
        delay: 400,
        once: true,
        duration: 700,
      },
    },
    {
      name: "PREMIUM IMAGES",
      content: "Generate images to illustrate your writing.",
      box_theme: "light",
      image: featureimage5,
      aos: {
        zoom: "zoom-in",
        delay: 400,
        once: true,
        duration: 700,
      },
    },
    {
      name: "and much more!",
      content: "Your possibilities are endless.",
      box_theme: "dark",
      image: featureimage6,
      aos: {
        zoom: "zoom-in",
        delay: 400,
        once: true,
        duration: 700,
      },
    },
  ],
};
