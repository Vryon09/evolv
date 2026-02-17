import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import api from "@/lib/api";
import { getToken, setToken } from "@/lib/token";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

type JwtPayload = { exp?: number };
type IUser = { _id?: string; name?: string; email?: string } | null;

interface IAuthContext {
  user: IUser;
  loading: boolean;
  login: (token: string, user?: IUser) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(null);
  const [loading, setLoading] = useState(true);
  const logoutTimer = useRef<number | null>(null);
  const navigate = useNavigate();

  const clearLogoutTimer = () => {
    if (logoutTimer.current) {
      window.clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  };

  const scheduleLogout = useCallback(
    (expSec?: number) => {
      clearLogoutTimer();
      if (!expSec) return;

      const ms = expSec * 1000 - Date.now();

      if (ms <= 0) {
        setToken(null);
        setUser(null);
        return;
      }

      logoutTimer.current = window.setTimeout(() => {
        setToken(null);
        setUser(null);
        navigate("/login");
      }, ms);
    },
    [navigate],
  );

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      try {
        const payload = jwtDecode<JwtPayload>(token);

        if (payload?.exp && typeof payload.exp === "number") {
          scheduleLogout(payload.exp);
        }
      } catch (error) {
        console.warn(error);
      }

      const { data } = await api.get("/api/auth/me");
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [scheduleLogout]);

  useEffect(() => {
    void refreshUser();

    const onLogout = () => {
      clearLogoutTimer();
      setUser(null);
      setLoading(false);
      navigate("/login");
    };

    window.addEventListener("evolv:logout", onLogout);

    return () => {
      window.removeEventListener("evolv:logout", onLogout);
      clearLogoutTimer();
    };
  }, [refreshUser, navigate]);

  const login = useCallback(
    (token: string, userObj?: IUser) => {
      setToken(token);

      if (userObj) {
        setUser(userObj);
        setLoading(false);
      } else {
        void refreshUser();
      }

      try {
        const payload = jwtDecode<JwtPayload>(token);

        if (payload?.exp && typeof payload.exp === "number")
          scheduleLogout(payload.exp);
      } catch (error) {
        console.error(error);
      }
    },
    [refreshUser, scheduleLogout],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    clearLogoutTimer();
    navigate("/login");
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      refreshUser,
    }),
    [user, loading, login, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
