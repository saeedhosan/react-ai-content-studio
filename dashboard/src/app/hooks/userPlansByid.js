import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function usePlansByid(id = 0) {
  const [plan, setPlans] = useState(null);

  const { isLoading, error, data } = useQuery(["plans"], async () => {
    const { data } = await axios.get(settings.app_rest_url + "/plans?id=" + id);
    return data;
  });

  useEffect(() => {
    if (data) {
      setPlans(data);
    }
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    plan,
    errors: error,
    loading: isLoading,
  };
}
