import { useEffect, useState } from "react";
import API from "../../services/api";

function AddCandidateForm({ onCandidateAdded }) {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    status: "Applied",
    resume: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/candidates", formData);

      alert("Candidate Added Successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        job: "",
        status: "Applied",
        resume: "",
      });

      onCandidateAdded();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 mb-6"
    >
      <h2 className="text-2xl font-bold mb-4">
        Add Candidate
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Candidate Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <select
        name="job"
        value={formData.job}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="">Select Job</option>

        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option>Applied</option>
        <option>Screening</option>
        <option>Interview</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Add Candidate
      </button>
    </form>
  );
}

export default AddCandidateForm;