import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";
import AddInterviewForm from "../../components/interviews/AddInterviewForm";

function Interviews() {
  const [interviews, setInterviews] = useState([]);

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

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Interviews
      </h1>

      <AddInterviewForm onInterviewAdded={fetchInterviews} />

      {interviews.length === 0 ? (
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
          {interviews.map((interview) => (
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
                {new Date(interview.date).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {interview.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Interviews;