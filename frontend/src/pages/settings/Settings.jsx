import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "Not Available";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8">
          Settings
        </h1>

        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Account Information
          </h2>

          <p className="text-gray-600">
            <strong>Email:</strong> {email}
          </p>
        </div>

        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Security
          </h2>

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            onClick={() =>
              alert("Change Password feature coming soon!")
            }
          >
            Change Password
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Logout
          </h2>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;