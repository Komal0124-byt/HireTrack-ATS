import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
function AddInterviewForm({
  onInterviewAdded,
  editingInterview,
  cancelEdit,
}) {
  const [candidates, setCandidates] = useState([]);

  const [formData, setFormData] = useState({
    candidate: "",
    interviewer: "",
    date: "",
    status: "Scheduled",
    notes: "",
  });

  useEffect(() => {
  if (editingInterview) {
    setFormData({
      candidate: editingInterview.candidate?._id || "",
      interviewer: editingInterview.interviewer,
      date: editingInterview.date
        ? new Date(editingInterview.date)
            .toISOString()
            .slice(0, 16)
        : "",
      status: editingInterview.status,
      notes: editingInterview.notes || "",
    });
  }
}, [editingInterview]);

  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidates");
      setCandidates(res.data);
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
    if (editingInterview) {
      await API.put(
        `/interviews/${editingInterview._id}`,
        formData
      );

      toast.success("Interview Updated Successfully");

      cancelEdit();
    } else {
      await API.post("/interviews", formData);

      toast.success("Interview Scheduled Successfully");
    }

    setFormData({
      candidate: "",
      interviewer: "",
      date: "",
      status: "Scheduled",
      notes: "",
    });

    onInterviewAdded();
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
  {editingInterview
    ? "Edit Interview"
    : "Schedule Interview"}
</h2>

      <select
        name="candidate"
        value={formData.candidate}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="">Select Candidate</option>

        {candidates.map((candidate) => (
          <option key={candidate._id} value={candidate._id}>
            {candidate.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="interviewer"
        placeholder="Interviewer Name"
        value={formData.interviewer}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option>Scheduled</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <textarea
        name="notes"
        placeholder="Interview Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {editingInterview
  ? "Update Interview"
  : "Schedule Interview"}
      </button>
    </form>
  );
}

export default AddInterviewForm;