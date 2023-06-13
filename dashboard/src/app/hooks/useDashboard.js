import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function useDashboard() {
  const [dasboard, setDashboard] = useState(null);

  const { isLoading, error, data, refetch } = useQuery(
    ["dashboard"],
    async () => {
      const { data } = await axios.get(settings.app_rest_url + "/dashboard");
      return data?.data;
    }
  );

  useEffect(() => {
    setDashboard(data);
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    dasboard,
    errors: error,
    loading: isLoading,
    refetch,
  };
}
