import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { settings } from "../settings";

export default function useImages() {
  const [images, setImages] = useState(null);

  const { isLoading, error, data, refetch } = useQuery(
    ["get_all_images"],
    async () => {
      const { data } = await axios.get(settings.app_rest_url + "/images");
      return data;
    }
  );

  useEffect(() => {
    if (data) {
      setImages(data);
    }
  }, [data]);

  // if (errors) {
  //   toast.error(errors);
  // }
  return {
    images: images,
    errors: error,
    loading: isLoading,
    refetch,
  };
}
