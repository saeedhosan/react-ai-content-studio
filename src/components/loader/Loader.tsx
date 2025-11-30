import { ReactNode } from "react";
import css from "./css/Loader.module.css";
type Props = {
    className?: string;
    children?: ReactNode;
};
export default function Loader({
    className = "",
    children = <span className={css.loading_text}>Loading...</span>,
    ...rest
}: Props): JSX.Element {
    return (
        <div className={css?.custom_loaders + " " + className} {...rest}>
            {children}
        </div>
    );
}
