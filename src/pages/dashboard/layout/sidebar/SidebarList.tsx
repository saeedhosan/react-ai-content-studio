import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { borderRound } from "../../../../app/utils/convert";

type Props = {
  name: string;
  path: string;
  icon: string;
  children?: ReactNode;
};

export default function SidebarList({ name, path, icon, children }: Props) {
  const { pathname } = useLocation();
  const active = pathname === path ? " active " : "";
  return (
    <li className="slide">
      <Link
        className={`side-menu__item ${active} ${borderRound("round-full")}`}
        data-toggle="slide"
        to={path}
      >
        <span className={"side-menu__icon " + icon} />
        <span className="side-menu__label">{name}</span>
        {children && <i className="angle fa fa-angle-right" />}
      </Link>
      {children && <ul className="slide-menu">{children}</ul>}
    </li>
  );
}
