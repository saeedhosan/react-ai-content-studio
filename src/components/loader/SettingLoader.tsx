import style from "./css/Loader.module.css";
import Loader from "./Loader";

export default function SettingLoader() {
  return (
    <>
      <Loader className={style?.profile} />
      <Loader className={style?.setting_list} />
      <Loader className={style?.setting_list} />
      <Loader className={style?.setting_list} />
      <Loader className={style?.setting_list} />
      <Loader className={style?.setting_list} />
      <Loader className={style?.setting_list} />
    </>
  );
}

interface SettingToLoaderProps {
  count?: number;
}

export const SettingToLoader: React.FC<SettingToLoaderProps> = ({
  count = 2,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_e, k) => (
        <Loader key={k} className={style?.setting_list_2} />
      ))}
    </>
  );
};
