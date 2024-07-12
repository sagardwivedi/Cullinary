import { Link, createFileRoute } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

import type { UserCreate } from "@/client";
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
import useAuth from "@/hooks/useAuth";

export const Route = createFileRoute("/auth/signup")({
	component: SignUp,
});

function SignUp() {
	const { registerMutation, resetError, error } = useAuth();

	const form = useForm<UserCreate>({
		mode: "onBlur",
		criteriaMode: "all",
		defaultValues: {
			email: "",
			password: "",
			username: "",
		},
	});

	const onSubmit: SubmitHandler<UserCreate> = async (data) => {
		if (form.formState.isSubmitting) return;

		resetError();

		try {
			await registerMutation.mutateAsync(data);
		} catch {
			console.log(error);
		}
	};

	return (
		<div className="justify-center items-center flex h-full">
			<Card className="mx-auto max-w-md w-full">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<div className="grid gap-2">
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input placeholder="sagar" {...field} />
												</FormControl>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<div className="grid gap-2">
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="sagar@gmail.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										</div>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<div className="grid gap-2">
												<FormLabel>Password</FormLabel>
												<Input
													type="password"
													placeholder="**********"
													{...field}
												/>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Create an account
								</Button>
							</div>
						</form>
					</Form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to="/auth/login" className="underline">
							Sign In
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
