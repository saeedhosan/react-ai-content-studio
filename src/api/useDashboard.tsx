import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import endpoints from "./endpoints";
import { DashboardResponseType } from "./ResponseType";
export default function useDashboard() {
    const [dashboard, setDashboard] = useState<DashboardResponseType | null>(null);
    const { data } = useQuery("dashboard", async () => axios.get(endpoints.dashboard.index));
    useEffect(() => {
        if (data?.data) setDashboard(data.data);
    }, [data]);

    return dashboard;
}
