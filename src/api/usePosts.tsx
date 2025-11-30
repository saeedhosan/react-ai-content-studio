import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import endpoints from "./endpoints";
import { PostsResponseType } from "./ResponseType";

export default function usePosts(): PostsResponseType | null {
    const [post, setPost] = useState<PostsResponseType | null>(null);
    const { data } = useQuery(["posts"], async () => await axios.get(endpoints.posts));
    useEffect(() => {
        if (data?.data) setPost(data?.data);
    }, [data]);
    return post;
}
