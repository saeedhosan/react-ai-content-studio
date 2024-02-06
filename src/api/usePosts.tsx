import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { PostsResponseType } from "./ResponseType";
import endpoints from "./endpoints";

export default function usePosts(): PostsResponseType | null {
  const [post, setPost] = useState<PostsResponseType | null>(null);
  const { data } = useQuery(["posts"], async () => await axios.get(endpoints.posts));

  useEffect(() => {
    if (data?.data?.data) setPost(data?.data?.data);
  }, [data]);
  return post;
}
