import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="text-2xl text-gray-600 hover:text-blue-600">
          <FaBell />
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-3xl text-blue-600" />

          <div>
            <h3 className="font-semibold">Admin</h3>
            <p className="text-sm text-gray-500">
              Recruiter
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;