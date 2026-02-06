import React, { createContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { getToken, setToken } from "@/lib/token";

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

  async function refreshUser() {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      // call your endpoint to fetch current user; adjust path/name as needed
      const { data } = await api.get("/api/auth/me"); // implement endpoint on backend to return current user
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshUser();
  }, []);

  function login(token: string, userObj?: IUser) {
    setToken(token);
    if (userObj) {
      setUser(userObj);
      setLoading(false);
    } else {
      // if backend returns only token, fetch user
      void refreshUser();
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  const value: IAuthContext = {
    user,
    loading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
