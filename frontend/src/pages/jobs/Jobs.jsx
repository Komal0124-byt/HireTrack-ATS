import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";
import AddJobForm from "../../components/jobs/AddJobForm";
import { toast } from "react-toastify";
function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/jobs/${id}`);

    toast.success("Job Deleted Successfully");

    fetchJobs();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to delete job"
    );
  }
};
const handleEdit = (job) => {
  setEditingJob(job);
};

const cancelEdit = () => {
  setEditingJob(null);
};
 const filteredJobs = jobs.filter((job) => {
  const matchesSearch =
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || job.status === statusFilter;

  return matchesSearch && matchesStatus;
});
  
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
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border rounded-lg p-3 mb-6 ml-4"
>
  <option value="All">All Status</option>
  <option value="Open">Open</option>
  <option value="Closed">Closed</option>
</select>
    <AddJobForm
  onJobAdded={() => {
    fetchJobs();
    setEditingJob(null);
  }}
  editingJob={editingJob}
  cancelEdit={cancelEdit}
/>
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
             onClick={() => handleEdit(job)}
             className="mt-4 mr-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
           >
             Edit
          </button>
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