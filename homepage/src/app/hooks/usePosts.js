import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function usePosts() {
  const [posts, setPosts] = useState(null);

  const { isLoading, error, data } = useQuery(["posts"], async () => {
    const { data } = await axios.get(settings.wp_rest_url + "/posts");
    return data;
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    posts,
    errors: error,
    loading: isLoading,
  };
}
