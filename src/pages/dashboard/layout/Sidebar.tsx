import useSubscription from "../../../api/useSubscription";
import { dpath } from "../../../app/utils/url";
import SidebarList from "./sidebar/SidebarList";
import SidebarLogo from "./sidebar/SidebarLogo";
import SidebarStatus from "./sidebar/SidebarStatus";

export default function Sidebar() {
    const subscription = useSubscription();
    return (
        <>
            <aside className="app-sidebar">
                <SidebarLogo />
                <ul className="side-menu app-sidebar3">
                    <SidebarStatus balance={subscription?.words || 0} />
                    <SidebarList
                        name="Dashboard"
                        icon="lead-3 fa-solid fa-chart-tree-map"
                        path={dpath("/")}
                    />
                    <SidebarList
                        name="Templates"
                        icon="fa-solid fa-microchip-ai"
                        path={dpath("/templates")}
                    />

                    <SidebarList
                        name="Documents"
                        icon="fa-solid fa-folder-bookmark"
                        path={dpath("/ducuments")}
                    />
                    <SidebarList
                        name="Affiliate"
                        icon="fa-solid fa-badge-dollar"
                        path={dpath("/affilate")}
                    />

                    <SidebarList
                        name="AI Images"
                        icon="lead-3 fa-solid fa-camera-viewfinder"
                        path={dpath("/images")}
                    />

                    <hr className="w-90 text-center m-auto" />

                    <SidebarList
                        name="Pricing Plans"
                        path={dpath("/pricing")}
                        icon="fa-solid fa-box-circle-check"
                    />
                    <SidebarList
                        name="Support Requests"
                        path={dpath("/supports")}
                        icon="fa-solid fa-messages-question"
                    />
                </ul>
            </aside>
        </>
    );
}
