import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

function AddCandidateForm({ onCandidateAdded }) {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    status: "Applied",
    resume: null,
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
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("job", formData.job);
      data.append("status", formData.status);

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      await API.post("/candidates", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Candidate Added Successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        job: "",
        status: "Applied",
        resume: null,
      });

      onCandidateAdded();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
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
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <select
        name="job"
        value={formData.job}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
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
        <option value="Applied">Applied</option>
        <option value="Screening">Screening</option>
        <option value="Interview">Interview</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input
        type="file"
        name="resume"
        accept=".pdf"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      />

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