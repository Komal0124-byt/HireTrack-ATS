import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-2 text-center">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;