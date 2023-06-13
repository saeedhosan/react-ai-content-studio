import $ from "jquery";
import { useEffect } from "react";
export default function CustomerScript() {
  useEffect(() => {
    $(document).ready(function () {
      $(window).on("scroll", function () {
        if ($(document).scrollTop() > 100) {
          $("#navbar-container").addClass("minimize-navbar");
          $(".nav-link").addClass("dark-color");
        } else {
          $("#navbar-container").removeClass("minimize-navbar");
          $(".nav-link").removeClass("dark-color");
        }
      });
    });
    $(window).on("scroll", function (e) {
      if ($(this).scrollTop() > 0) {
        $("#back-to-top").fadeIn("slow");
      } else {
        $("#back-to-top").fadeOut("slow");
      }
    });
    $("#back-to-top").on("click", function (e) {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
      return false;
    });
  }, []);
  return null;
}
