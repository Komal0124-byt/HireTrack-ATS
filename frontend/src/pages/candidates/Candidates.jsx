import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";
import AddCandidateForm from "../../components/candidates/AddCandidateForm";

function Candidates() {
  const [candidates, setCandidates] = useState([]);

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

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Candidates
      </h1>

      <AddCandidateForm onCandidateAdded={fetchCandidates} />

      {candidates.length === 0 ? (
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
          {candidates.map((candidate) => (
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

              <p>
                <strong>Status:</strong>{" "}
                {candidate.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Candidates;