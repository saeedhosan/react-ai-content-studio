import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ImageArrayResponseType } from "./ResponseType";

export default function useImages() {
  const [images, setImages] = useState<ImageArrayResponseType | null>(null);

  const { data, refetch } = useQuery(["images"], async () =>
    axios.get("/images")
  );

  useEffect(() => {
    if (data?.data) {
      setImages(data.data);
    }
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return { images, refetch };
}
