import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { SubscriptionResponseType } from "./ResponseType";
export default function useSubscription() {
  const [subscription, setSubscription] =
    useState<SubscriptionResponseType | null>(null);
  const { data } = useQuery("subscription", async () =>
    axios.get("/subscription")
  );
  useEffect(() => {
    if (data?.data) setSubscription(data.data);
  }, [data]);
  return subscription;
}
