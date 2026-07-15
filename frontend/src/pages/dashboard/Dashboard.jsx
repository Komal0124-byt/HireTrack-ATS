import Layout from "../../components/layout/Layout";
import StatCard from "../../components/ui/StatCard";
import { stats } from "../../utils/dashboardData";

function Dashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
  <h2 className="text-xl font-semibold mb-4">
    Recent Activity
  </h2>

  <ul className="space-y-3">
    <li>✅ Frontend Developer position created.</li>
    <li>👤 Rahul Sharma applied.</li>
    <li>📅 Interview scheduled for Priya Singh.</li>
    <li>🎉 Aman Verma marked as Hired.</li>
  </ul>
</div>
    </Layout>
  );
}

export default Dashboard;