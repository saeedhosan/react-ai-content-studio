import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function useDocuments() {
  const [documents, setDocuments] = useState(null);

  const { isLoading, error, data, refetch } = useQuery(
    ["documents"],
    async () => {
      const { data } = await axios.get(settings.app_rest_url + "/documents");
      return data?.data;
    }
  );

  useEffect(() => {
    setDocuments(data);
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    documents,
    errors: error,
    loading: isLoading,
    refetch,
  };
}
