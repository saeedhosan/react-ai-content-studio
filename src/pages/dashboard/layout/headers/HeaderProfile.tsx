import { Link } from "react-router-dom";
import { avatar } from "../../../../app/utils/genarate";
import { getAuthSession } from "../../../../app/utils/storage";
import { dpath } from "../../../../app/utils/url";
import { SettingToLoader } from "../../../../components/loader/SettingLoader";

export default function HeaderProfile() {
    const user = getAuthSession();
    const menus = [
        {
            name: "My Account",
            link: dpath("/profile"),
            icon: "profile-icon fa-solid fa-id-badge",
        },
        {
            name: "Templates",
            icon: "profile-icon fa-solid fa-microchip-ai",
            link: dpath("/templates"),
        },
        {
            name: "Affiliate Program",
            icon: "profile-icon fa-solid fa-badge-dollar",
            link: dpath("/affilate"),
        },
        {
            name: "Purchase History",
            icon: "profile-icon fa-solid fa-money-check-pen",
            link: dpath("/purchase"),
        },
        {
            name: "Support Request",
            icon: "profile-icon fa-solid fa-messages-question",
            link: dpath("/supports"),
        },
        {
            name: "Logout",
            icon: "profile-icon fa-solid fa-right-from-bracket",
            link: "/logout",
        },
    ];
    return (
        <div className="dropdown profile-dropdown ml-4">
            <a href="#" className="nav-link" data-bs-toggle="dropdown">
                <span className="float-right">
                    <img
                        src={user?.user_img || avatar(user?.nickname)}
                        alt="img"
                        className="avatar avatar-md"
                    />
                </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow animated">
                <div className="text-center pt-2">
                    <span className="text-center user fs-12 pb-0 font-weight-bold">
                        {user?.nickname}
                    </span>
                </div>

                {user ? (
                    menus &&
                    menus.map((menu, k) => (
                        <Link key={k} className="dropdown-item d-flex" to={menu?.link}>
                            <span className={menu?.icon} />
                            <div className="fs-12">{menu?.name}</div>
                        </Link>
                    ))
                ) : (
                    <SettingToLoader count={4} />
                )}
            </div>
        </div>
    );
}
