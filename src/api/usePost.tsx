import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import endpoints from "./endpoints";
import { PostResponseType } from "./ResponseType";

export default function usePost(
  slug: string | number
): PostResponseType | null {
  const [post, setPost] = useState<PostResponseType | null>(null);
  const { data } = useQuery(
    ["posts", { slug }],
    async () => await axios.get(endpoints?._post + slug)
  );
  useEffect(() => {
    if (data?.data?.data) setPost(data?.data?.data);
  }, [data]);
  return post;
}
