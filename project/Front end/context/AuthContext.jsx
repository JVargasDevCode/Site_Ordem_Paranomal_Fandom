import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import AuthService from "../services/AuthService.js";
import UsuarioService from "../services/UsuarioService.js";
import { ApiError } from "../services/api.js";

export const AuthContext = createContext(null);

function getUserFromResponse(response) {
  const user = response?.usuario ?? response?.user ?? response?.data?.usuario ?? response?.data?.user;

  if (!user || typeof user !== "object") {
    throw new Error("A resposta de autenticação não contém os dados esperados do usuário.");
  }

  return user;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await AuthService.obterSessao();
      const currentUser = getUserFromResponse(response);
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setUser(null);
        return null;
      }

      setAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser().catch(() => {
      // O erro fica disponível em authError para que a interface possa apresentá-lo.
    });
  }, [refreshUser]);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await AuthService.entrar(credentials);
      const authenticatedUser = getUserFromResponse(response);
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (error) {
      setAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthError(null);

    try {
      await AuthService.sair();
      setUser(null);
    } catch (error) {
      setAuthError(error);
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (userData) => {
    setAuthError(null);

    try {
      const response = await UsuarioService.atualizarPerfil(userData);
      const updatedUser = getUserFromResponse(response);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setAuthError(error);
      throw error;
    }
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    authError,
    login,
    logout,
    refreshUser,
    updateUser,
    clearAuthError,
  }), [user, isLoading, authError, login, logout, refreshUser, updateUser, clearAuthError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
