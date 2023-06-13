import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import endpoints from "./endpoints";
import { DocumenteArrayResponseType } from "./ResponseType";
export default function useDocuments() {
  const [documents, setDocuments] = useState<DocumenteArrayResponseType>(null);
  const { data } = useQuery("documents", async () =>
    axios.get(endpoints.documents)
  );
  useEffect(() => {
    if (data?.data) setDocuments(data.data);
  }, [data]);
  return documents;
}
