import React from "react";
import css from "./css/Loader.module.css";
const child = () => {};

export default function Loaders({
  className = "",
  children = <span className={css.loading_text}>Loading...</span>,
  ...rest
}) {
  return (
    <div className={css?.appsaeed_loaders + " " + className} {...rest}>
      {children}
    </div>
  );
}
