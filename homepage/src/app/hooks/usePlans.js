import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function usePlans() {
  const [plans, setPlans] = useState(null);

  const { isLoading, error, data } = useQuery(["plans"], async () => {
    const { data } = await axios.get(settings.app_rest_url + "/plans");
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
    plans,
    errors: error,
    loading: isLoading,
  };
}
