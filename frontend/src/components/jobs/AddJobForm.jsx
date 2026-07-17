import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
function AddJobForm({
  onJobAdded,
  editingJob,
  cancelEdit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-Time",
    status: "Open",
    description: "",
  });
   useEffect(() => {
  if (editingJob) {
    setFormData({
      title: editingJob.title,
      company: editingJob.company,
      location: editingJob.location,
      type: editingJob.type,
      status: editingJob.status,
      description: editingJob.description,
    });
  }
}, [editingJob]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingJob) {
      await API.put(`/jobs/${editingJob._id}`, formData);

      toast.success("Job Updated Successfully");

      cancelEdit();
    } else {
      await API.post("/jobs", formData);

      toast.success("Job Added Successfully");
    }

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
         {editingJob ? "Edit Job" : "Add New Job"}
      </h2>

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
        {editingJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}

export default AddJobForm;