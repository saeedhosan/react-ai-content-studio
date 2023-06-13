import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import endpoints from "./endpoints";
import { PlansResponseType } from "./ResponseType";

export default function usePlans(): PlansResponseType | null {
  const [plans, setPlans] = useState<PlansResponseType | null>(null);
  const { data } = useQuery(
    ["plans"],
    async () => await axios.get(endpoints.plans)
  );
  useEffect(() => {
    if (data?.data?.data) setPlans(data?.data?.data);
  }, [data]);
  return plans;
}
