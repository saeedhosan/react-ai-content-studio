import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { extartError } from "../helper";
import { settings } from "../settings";

export default function usePages() {
  const [pages, setPages] = useState(null);
  const [errors, setErrors] = useState(null);

  const { data, isLoading, error } = useQuery(["pages"], async () => {
    const { data } = await axios.get(settings.wp_rest_url + "/pages");
    return data;
  });

  useEffect(() => {
    if (data) {
      setPages(data);
    } else {
      setErrors(extartError(error));
    }
  }, [data, error]);

  return {
    pages,
    errors,
    loading: isLoading,
  };
}
