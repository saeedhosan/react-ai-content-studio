import React from "react";
import style from "./css/Loader.module.css";
import Loaders from "./Loaders";

export default function SettingLoader() {
  return (
    <>
      <Loaders className={style?.profile} />
      <Loaders className={style?.setting_list} />
      <Loaders className={style?.setting_list} />
      <Loaders className={style?.setting_list} />
      <Loaders className={style?.setting_list} />
      <Loaders className={style?.setting_list} />
      <Loaders className={style?.setting_list} />
    </>
  );
}
