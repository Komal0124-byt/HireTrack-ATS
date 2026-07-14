import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Jobs", path: "/jobs", icon: <FaBriefcase /> },
    { name: "Candidates", path: "/candidates", icon: <FaUsers /> },
    { name: "Interviews", path: "/interviews", icon: <FaCalendarAlt /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">HireTrack ATS</h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;