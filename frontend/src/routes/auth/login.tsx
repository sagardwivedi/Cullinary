import {
	Link,
	createFileRoute,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

import type { Body_auth_login_access_token as AccessToken } from "@/client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth, { isLoggedIn } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
	beforeLoad: () => {
		if (isLoggedIn()) {
			throw redirect({ to: "/" });
		}
	},
});

function LoginPage() {
	const { error, loginMutation, resetError, user } = useAuth();
	const navigate = useNavigate();

	const form = useForm<AccessToken>({
		mode: "onBlur",
		criteriaMode: "all",
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<AccessToken> = async (data) => {
		if (form.formState.isSubmitting) return;

		resetError();

		try {
			await loginMutation.mutateAsync(data);
			navigate({ to: `/${user?.username}` });
		} catch {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-center h-full items-center">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="username, email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<div className="flex items-center">
													<FormLabel>Password</FormLabel>
													<Link
														href="#"
														className="ml-auto inline-block text-sm underline"
													>
														Forgot your password?
													</Link>
												</div>
												<FormControl>
													<Input type="password" {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</form>
					</Form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to="/auth/signup" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
