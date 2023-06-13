import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function usePostbyurl(url = "") {
  const [get_post, setPost] = useState(null);

  const { isLoading, error, data } = useQuery(
    ["post-by-url", url],
    async () => {
      const { data } = await axios.get(
        `${settings.app_rest_url}/post_by_url?url=${url}`
      );
      return data;
    }
  );

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);
  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    get_post,
    errors: error,
    loading: isLoading,
    setPost,
  };
}
