import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SuppoertsResponseType } from "./ResponseType";
import endpoints from "./endpoints";

export default function useSupports() {
    const [supports, setSupports] = useState<SuppoertsResponseType | null>(null);
    const { data, refetch } = useQuery(["supports"], async () =>
        axios.get(endpoints.supports.index)
    );
    useEffect(() => {
        if (data?.data) setSupports(data.data);
    }, [data]);
    return {
        supports,
        refetch,
    };
}
