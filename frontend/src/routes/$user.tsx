import { isLoggedIn } from "@/hooks/useAuth";
import { createFileRoute, redirect, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$user")({
	component: UserHome,
	beforeLoad: () => {
		if (!isLoggedIn()) {
			throw redirect({ to: "/auth/login" });
		}
	},
});

function UserHome() {
	const { user } = useParams({
		from: "/$user",
	});
	return <div>Hello {user}</div>;
}
