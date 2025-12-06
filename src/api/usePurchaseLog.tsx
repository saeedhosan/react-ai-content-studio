import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { PurchaseLogArrayResponse } from "./ResponseType";
import endpoints from "./endpoints";

export default function usePurchaseLog() {
    const [purchase, setPurchase] = useState<PurchaseLogArrayResponse | null>(null);

    const { isLoading, error, data, refetch } = useQuery(["purchase-logs"], async () =>
        axios.get(endpoints.purchaseLogs.index)
    );

    useEffect(() => {
        if (data?.data) setPurchase(data.data);
    }, [data]);

    return {
        purchase,
        errors: error,
        loading: isLoading,
        refetch,
    };
}
