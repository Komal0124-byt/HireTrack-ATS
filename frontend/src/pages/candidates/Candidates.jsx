import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";
import AddCandidateForm from "../../components/candidates/AddCandidateForm";
import { toast } from "react-toastify";
function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidates");
      setCandidates(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this candidate?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/candidates/${id}`);

    toast.success("Candidate Deleted Successfully");

    fetchCandidates();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to delete candidate"
    );
  }
};
  const handleStatusChange = async (id, status) => {
  try {
    await API.put(`/candidates/${id}/status`, {
      status,
    });

    toast.success("Candidate Status Updated");

    fetchCandidates();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update status"
    );
  }
};
   const filteredCandidates = candidates.filter((candidate) =>
  candidate.name.toLowerCase().includes(search.toLowerCase()) ||
  candidate.email.toLowerCase().includes(search.toLowerCase()) ||
  candidate.phone.toLowerCase().includes(search.toLowerCase())
);
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Candidates
      </h1>
      <input
         type="text"
         placeholder="Search candidate..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
      />
      <AddCandidateForm onCandidateAdded={fetchCandidates} />

      {filteredCandidates.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold">
            No Candidates Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first candidate.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white shadow rounded-lg p-5"
            >
              <h2 className="text-xl font-bold">
                {candidate.name}
              </h2>

              <p>{candidate.email}</p>

              <p>{candidate.phone}</p>

              <p>
                <strong>Job:</strong>{" "}
                {candidate.job?.title}
              </p>
               <div className="mt-3">
                 <label className="font-semibold block mb-2">
                    Status
                  </label>

                  <select
                      value={candidate.status}
                      onChange={(e) =>
                         handleStatusChange(candidate._id, e.target.value)
                      }
                     className="border rounded-lg p-2 w-full"
                   >
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                 </div>
              {candidate.resume && (
                <a
                   href={`http://localhost:5000/uploads/${candidate.resume}`}
                   target="_blank"
                    rel="noreferrer"
                   className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                   View Resume
               </a>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Candidates;