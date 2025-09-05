import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Welcome to Student Feedback System</h2>
      <div className="d-flex justify-content-center gap-4">
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/student")}>
          🎓 Student Login
        </button>
        <button className="btn btn-secondary btn-lg" onClick={() => navigate("/admin")}>
          👨‍🏫 Admin Login
        </button>
      </div>
    </div>
  );
}

export default Home;
