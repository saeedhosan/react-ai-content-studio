import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuthSession, setAuthSession } from "../../app/utils/storage";
import { UserResponseType } from "../ResponseType";

const AuthContext = createContext<UserResponseType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): UserResponseType | null {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponseType | null>(null);

  useEffect(() => {
    const storage = getAuthSession();
    if (storage) {
      setUser(storage);
    }
    const data = undefined;
    if (data) {
      setAuthSession(data);
    }
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
