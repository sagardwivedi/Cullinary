import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-8xl font-bold leading-4 mb-4">404</h1>
      <h2 className="text-lg">Opps!</h2>
      <h3 className="text-lg">Page not found.</h3>
      <Link to="/">Go Back</Link>
    </div>
  );
}
