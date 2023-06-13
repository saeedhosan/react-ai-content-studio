import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { extartError, setSession } from "../helper";
import { settings } from "../settings";

const AuthContex = React.createContext(null);

export function useAuth() {
  return useContext(AuthContex);
}

export default function AuthProvider({ children }) {
  const { isLoading, data } = useQuery(["users"], async () => {
    const { data } = await axios.post(`${settings.app_rest_url}/user`);
    return data;
  });
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (data && data.success) {
      setUser(data?.user);
      setSession("user", data?.user);
    } else {
      setErrors(extartError(data));
    }
  }, [data]);

  if (errors) {
    toast.error(errors);
  }

  const value = {
    user,
    errors,
    loading: isLoading,
    setUser,
    setErrors,
  };

  return <AuthContex.Provider value={value}>{children}</AuthContex.Provider>;
}
