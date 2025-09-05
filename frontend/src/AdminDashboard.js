import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getFeedback = async () => {
    const res = await axios.get("http://localhost:5000/get-feedback");
    setFeedbackList(res.data);
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Delete this feedback?")) {
      await axios.delete(`http://localhost:5000/delete-feedback/${id}`);
      getFeedback(); // refresh
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or subject..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      <div className="text-end mb-3">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => navigate("/admin")}
        >
          Logout
        </button>
      </div>

      {feedbackList.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div className="row">
          {feedbackList
            .filter(
              (fb) =>
                fb.name.toLowerCase().includes(searchTerm) ||
                fb.subject.toLowerCase().includes(searchTerm)
            )
            .map((fb) => (
              <div key={fb.id} className="col-md-6 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      {fb.name} on <em>{fb.subject}</em>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">⭐ {fb.rating}</h6>
                    <p className="card-text">{fb.comments}</p>
                    {fb.timestamp && (
                      <p className="card-text">
                        <small className="text-muted">
                          Submitted: {new Date(fb.timestamp).toLocaleString()}
                        </small>
                      </p>
                    )}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteFeedback(fb.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
