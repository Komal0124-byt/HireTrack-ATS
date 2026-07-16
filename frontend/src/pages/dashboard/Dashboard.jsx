import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react"
import API from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
  totalJobs: 0,
  totalCandidates: 0,
  totalInterviews: 0,
  totalUsers: 0,
});
const [recentJobs, setRecentJobs] = useState([]);
useEffect(() => {
  fetchStats();
  fetchRecentJobs();
}, []);

const fetchStats = async () => {
  try {
    const res = await API.get("/dashboard/stats");
    setStats(res.data);
  } catch (error) {
    console.error(error);
  }
};
const fetchRecentJobs = async () => {
  try {
    const res = await API.get("/dashboard/recent-jobs");
    setRecentJobs(res.data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <Layout>
  <h1 className="text-3xl font-bold mb-6">
    Dashboard
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-gray-500">Total Jobs</h2>
      <p className="text-4xl font-bold mt-2">
        {stats.totalJobs}
      </p>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-gray-500">Candidates</h2>
      <p className="text-4xl font-bold mt-2">
        {stats.totalCandidates}
      </p>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-gray-500">Interviews</h2>
      <p className="text-4xl font-bold mt-2">
        {stats.totalInterviews}
      </p>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-gray-500">Users</h2>
      <p className="text-4xl font-bold mt-2">
        {stats.totalUsers}
      </p>
    </div>
  </div>
   <div className="bg-white rounded-lg shadow p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Recent Jobs
  </h2>

  {recentJobs.length === 0 ? (
    <p>No Jobs Available</p>
  ) : (
    recentJobs.map((job) => (
      <div
        key={job._id}
        className="border-b py-3"
      >
        <h3 className="font-semibold">
          {job.title}
        </h3>

        <p className="text-gray-600">
          {job.company}
        </p>

        <p className="text-sm text-gray-500">
          {job.location}
        </p>
      </div>
    ))
  )}
</div>
</Layout>
  );
}

export default Dashboard;