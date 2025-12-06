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
            _url: dpath("/profile"),
            icon: "profile-icon fa-solid fa-id-badge",
            async: true,
        },
        {
            name: "Templates",
            icon: "profile-icon fa-solid fa-microchip-ai",
            _url: dpath("/templates"),
            sync: true,
        },
        {
            name: "Affiliate Program",
            icon: "profile-icon fa-solid fa-badge-dollar",
            _url: dpath("/affilate"),
            sync: true,
        },
        {
            name: "Purchase History",
            icon: "profile-icon fa-solid fa-money-check-pen",
            _url: dpath("/purchase"),
            sync: true,
        },
        {
            name: "Support Request",
            icon: "profile-icon fa-solid fa-messages-question",
            _url: dpath("/supports"),
            sync: true,
        },
        {
            name: "Logout",
            icon: "profile-icon fa-solid fa-right-from-bracket",
            _url: "/logout",
            sync: false,
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
                    menus.map((menu, k) => {
                        if (menu?.sync) {
                            return (
                                <Link key={k} className="dropdown-item d-flex" to={menu?._url}>
                                    <span className={menu?.icon} />
                                    <div className="fs-12">{menu?.name}</div>
                                </Link>
                            );
                        } else {
                            return (
                                <a key={k} className="dropdown-item d-flex" href={menu?._url}>
                                    <span className={menu?.icon} />
                                    <div className="fs-12">{menu?.name}</div>
                                </a>
                            );
                        }
                    })
                ) : (
                    <SettingToLoader count={4} />
                )}
            </div>
        </div>
    );
}
