import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function useSubscription() {
  const [subscription, setSubscription] = useState(null);

  const { isLoading, error, data, refetch } = useQuery(
    ["subscription"],
    async () => {
      const { data } = await axios.post(
        settings.app_rest_url + "/subscription"
      );
      return data;
    }
  );

  useEffect(() => {
    if (data) {
      setSubscription(data);
    }
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    subscription,
    errors: error,
    refetch,
    loading: isLoading,
  };
}
