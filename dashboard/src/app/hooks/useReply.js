import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function useReply(id = null) {
  const [reply, setReply] = useState(null);

  const { isLoading, error, data, refetch } = useQuery(
    ["reply"],
    async () => {
      const { data } = await axios.get(settings.app_rest_url + "/supports/reply?id="+ id);
      return data?.reply;
    }
  );

  useEffect(() => {
    setReply(data);
  }, [data]);
  return {
    reply,
    errors: error,
    loading: isLoading,
    refetch,
  };
}
