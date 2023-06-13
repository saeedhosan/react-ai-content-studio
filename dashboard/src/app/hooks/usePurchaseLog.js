import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function usePurchaseLog() {
  const [purchase, setPurchase] = useState(null);

  const { isLoading, error, data, refetch } = useQuery(
    ["purchase"],
    async () => {
      const { data } = await axios.get(settings.app_rest_url + "/purchase");
      return data?.logs;
    }
  );

  useEffect(() => {
    setPurchase(data);
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    purchase,
    errors: error,
    loading: isLoading,
    refetch,
  };
}
