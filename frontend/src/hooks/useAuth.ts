import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useState } from "react";

import type {
	Body_auth_login_access_token as AccessToken,
	ApiError,
	UserCreate,
} from "@/client";
import { loginAccessToken, readUserMe, registerUser } from "@/client";

const isLoggedIn = () => {
	return localStorage.getItem("access_token") !== null;
};

const useAuth = () => {
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	const { data: user, isLoading } = useQuery({
		queryKey: ["currentUser"],
		queryFn: readUserMe,
		enabled: isLoggedIn(),
	});

	const register = async (data: UserCreate) => {
		await registerUser({
			requestBody: data,
		});
	};

	const registerMutation = useMutation({
		mutationFn: register,
		onSuccess: () => {
			navigate({ to: "/" });
		},
		onError: (err: ApiError) => {
			let errDetail = (err.body as any)?.detail;

			if (err instanceof AxiosError) {
				errDetail = err.message;
			}

			if (Array.isArray(errDetail)) {
				errDetail = "Something went wrong";
			}

			setError(errDetail);
		},
	});

	const login = async (data: AccessToken) => {
		const response = await loginAccessToken({
			formData: data,
		});
		if (response.access_token) {
			localStorage.setItem("access_token", response.access_token);
		}
	};

	const loginMutation = useMutation({
		mutationFn: login,
		onError: (err: ApiError) => {
			let errDetail = (err.body as any)?.detail;

			if (err instanceof AxiosError) {
				errDetail = err.message;
			}

			if (Array.isArray(errDetail)) {
				errDetail = "Something went wrong";
			}

			setError(errDetail);
		},
	});

	const logout = () => {
		localStorage.removeItem("access_token");
		navigate({ to: "/auth/login" });
	};

	return {
		loginMutation,
		registerMutation,
		logout,
		user,
		isLoading,
		error,
		resetError: () => setError(null),
	};
};

export { isLoggedIn };
export default useAuth;
