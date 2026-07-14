import Layout from "../../components/layout/Layout";
import StatCard from "../../components/ui/StatCard";

function Dashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Jobs" value="24" />
        <StatCard title="Candidates" value="186" />
        <StatCard title="Interviews" value="42" />
        <StatCard title="Hired" value="18" />
      </div>
    </Layout>
  );
}

export default Dashboard;