import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MenuType } from "../../app/types/headers";
type PropsExpect = {
  children?: ReactNode | null;
  arg?: {
    [x: string]: unknown;
  };
};
type Props = PropsExpect & MenuType;
export default function MenuItem({
  name,
  path,
  sync = false,
  classes = "",
  children = null,
  ...arg
}: Props) {
  return (
    <li {...arg} className={"nav-item"}>
      {sync ? (
        <Link to={path} className={classes}>
          {children ? children : name}
        </Link>
      ) : (
        <a href={path} className={classes}>
          {children ? children : name}
        </a>
      )}
    </li>
  );
}
