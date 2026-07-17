import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";
import AddJobForm from "../../components/jobs/AddJobForm";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
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
  const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(search.toLowerCase()) ||
  job.company.toLowerCase().includes(search.toLowerCase()) ||
  job.location.toLowerCase().includes(search.toLowerCase())
);
  const handleDelete = async (id) => {
  try {
    await API.delete(`/jobs/${id}`);
    fetchJobs();
  } catch (error) {
    console.error(error);
  }
};
 return (
  <Layout>
    <h1 className="text-3xl font-bold mb-6">Jobs</h1>
    <input
  type="text"
  placeholder="Search by title, company or location..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-lg p-3 mb-6"
/>
<select
  className="border rounded-lg p-3 mb-6 ml-4"
>
  <option>All Status</option>
  <option>Open</option>
  <option>Closed</option>
</select>
    <AddJobForm onJobAdded={fetchJobs} />
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
      {filteredJobs.map((job) => (
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
          <button
              onClick={() => handleDelete(job._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
         >
              Delete
          </button>
        </div>
      ))}
    </div>
  </Layout>
);
}

export default Jobs;