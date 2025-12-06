import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAuthSession, setAuthSession } from "../../app/utils/storage";
import endpoints from "../endpoints";
import { UserResponseType } from "../ResponseType";

const AuthContext = createContext<UserResponseType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): UserResponseType | null {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserResponseType | null>(null);
    const { data } = useQuery(["user"], async () => axios.post(endpoints.auth.user));

    useEffect(() => {
        const storage = getAuthSession();
        if (storage) {
            setUser(storage);
        }
        if (data?.data?.user) {
            setAuthSession(data.data.user);
        }
    }, [data]);
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
