import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";
import AddInterviewForm from "../../components/interviews/AddInterviewForm";
import { toast } from "react-toastify";
function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");
  const [editingInterview, setEditingInterview] = useState(null);
  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await API.get("/interviews");
      setInterviews(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this interview?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/interviews/${id}`);

    toast.success("Interview Deleted Successfully");

    fetchInterviews();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to delete interview"
    );
  }
};
const handleEdit = (interview) => {
  setEditingInterview(interview);
};

const cancelEdit = () => {
  setEditingInterview(null);
};

  const filteredInterviews = interviews.filter((interview) =>
    interview.candidate?.name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    interview.interviewer
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    interview.status
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Interviews
      </h1>

      <input
        type="text"
        placeholder="Search interviews..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      />

      <AddInterviewForm
           onInterviewAdded={() => {
             fetchInterviews();
             setEditingInterview(null);
          }}
          editingInterview={editingInterview}
           cancelEdit={cancelEdit}
      />

      {filteredInterviews.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold">
            No Interviews Scheduled
          </h2>

          <p className="text-gray-500 mt-2">
            Schedule your first interview.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredInterviews.map((interview) => (
            <div
              key={interview._id}
              className="bg-white shadow rounded-lg p-5"
            >
              <h2 className="text-xl font-bold">
                {interview.candidate?.name}
              </h2>

              <p>
                <strong>Interviewer:</strong>{" "}
                {interview.interviewer}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  interview.date
                ).toLocaleString()}
              </p>

              <p className="mt-3">
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                    interview.status === "Scheduled"
                      ? "bg-blue-500"
                      : interview.status === "Completed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {interview.status}
                </span>
              </p>
              <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(interview)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                   Edit
               </button>

                <button
                    onClick={() => handleDelete(interview._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                 >
                     Delete
                </button>
             </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Interviews;