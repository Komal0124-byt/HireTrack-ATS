function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        HireTrack
      </h1>

      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Jobs</li>
        <li>Candidates</li>
        <li>Interviews</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
}

export default Sidebar;