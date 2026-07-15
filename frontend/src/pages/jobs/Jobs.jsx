import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

 return (
  <Layout>
    <h1 className="text-3xl font-bold mb-6">Jobs</h1>

    {jobs.length === 0 && (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold">
          No Jobs Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add your first job to get started.
        </p>
      </div>
    )}

    <div className="grid gap-4">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white shadow rounded-lg p-5"
        >
          <h2 className="text-xl font-bold">{job.title}</h2>

          <p className="text-gray-600">
            {job.company}
          </p>

          <p>{job.location}</p>

          <p className="mt-2">
            {job.description}
          </p>

          <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded">
            {job.status}
          </span>
        </div>
      ))}
    </div>
  </Layout>
);
}

export default Jobs;