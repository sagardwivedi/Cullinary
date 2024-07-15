import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  type Body_auth_login_access_token as AccessToken,
  type UserCreate,
  loginAccessToken,
  readUserMe,
  registerUser,
} from "@/client";

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null;
};

const useAuth = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState<string | null>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: readUserMe,
    enabled: isLoggedIn(),
  });

  const register = async (data: UserCreate) => {
    const response = await registerUser({
      requestBody: data,
    });
    return response;
  };

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data) {
        navigate(data.username);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const login = async (data: AccessToken) => {
    const response = await loginAccessToken({
      formData: data,
    });
    localStorage.setItem("access_token", response.access_token);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(state?.path || `/${user?.username}`);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/auth/login");
  };

  return {
    loginMutation,
    registerMutation,
    logout,
    error,
    user,
    isLoading,
    resetError: () => setError(null),
  };
};

export { isLoggedIn };
export default useAuth;
