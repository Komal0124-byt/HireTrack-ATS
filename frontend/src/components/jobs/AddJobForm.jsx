import { useState } from "react";
import API from "../../services/api";

function AddJobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-Time",
    status: "Open",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", formData);

      alert("Job Added Successfully");

      setFormData({
        title: "",
        company: "",
        location: "",
        type: "Full-Time",
        status: "Open",
        description: "",
      });

      onJobAdded();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 mb-6"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Job</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Add Job
      </button>
    </form>
  );
}

export default AddJobForm;