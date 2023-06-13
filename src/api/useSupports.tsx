import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SuppoertsResponseType } from "./ResponseType";

export default function useSupports() {
  const [supports, setSupports] = useState<SuppoertsResponseType | null>(null);
  const { data, refetch } = useQuery(["supports"], async () =>
    axios.get("/supports")
  );
  useEffect(() => {
    if (data?.data) setSupports(data.data);
  }, [data]);
  return {
    supports,
    refetch,
  };
}
