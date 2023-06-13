import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function useComments() {
  const [comments, setComments] = useState(null);

  const { isLoading, error, data, refetch } = useQuery(
    ["supports"],
    async () => {
      const { data } = await axios.get(settings.app_rest_url + "/supports");
      return data?.data;
    }
  );

  useEffect(() => {
    setComments(data);
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    comments,
    errors: error,
    loading: isLoading,
    refetch,
  };
}
