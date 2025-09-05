import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactStars from "react-rating-stars-component";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import Home from "./Home"; // 👈 new import

function App() {
  const [form, setForm] = useState({ name: "", subject: "", rating: "", comments: "" });
  const [feedbackList, setFeedbackList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/update-feedback/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/submit-feedback", form);
    }
    alert("Feedback submitted");
    setForm({ name: "", subject: "", rating: "", comments: "" });
    getFeedback();
  };

  const getFeedback = async () => {
    const res = await axios.get("http://localhost:5000/get-feedback");
    setFeedbackList(res.data);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await axios.delete(`http://localhost:5000/delete-feedback/${id}`);
      getFeedback();
    }
  };

  const editFeedback = (fb) => {
    setForm({
      name: fb.name,
      subject: fb.subject,
      rating: fb.rating,
      comments: fb.comments,
    });
    setEditId(fb.id);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      setLoginForm({ email: "", password: "" });
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/student" element={
          <div className="container mt-5">
            <h2 className="mb-4">Student Feedback Form</h2>
            {!user ? (
              <form onSubmit={handleLogin} className="mb-4 border p-4 rounded shadow">
                <h4>Login</h4>
                <div className="mb-3">
                  <input className="form-control" name="email" placeholder="Email"
                    value={loginForm.email}
                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                    required />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" name="password" placeholder="Password"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
              </form>
            ) : (
              <>
                <div className="mb-3 text-end">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                </div>

                <form onSubmit={submitFeedback} className="border p-4 rounded shadow">
                  <div className="mb-3">
                    <input className="form-control" name="name" placeholder="Your Name"
                      value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <input className="form-control" name="subject" placeholder="Subject"
                      value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <ReactStars
                      count={5}
                      size={30}
                      value={Number(form.rating)}
                      onChange={(newRating) => setForm({ ...form, rating: newRating })}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" name="comments" placeholder="Comments"
                      value={form.comments} onChange={handleChange}></textarea>
                  </div>
                  <button className="btn btn-primary" type="submit">{editId ? "Update" : "Submit"}</button>
                </form>

                <h4 className="mt-5">Feedback Received</h4>
                <div className="row mt-3">
                  {feedbackList.map((fb) => (
                    <div key={fb.id} className="col-md-6 mb-3">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">{fb.name} on <em>{fb.subject}</em></h5>
                          <h6 className="card-subtitle mb-2 text-muted">⭐ {fb.rating}</h6>
                          <p className="card-text">{fb.comments}</p>
                          {fb.timestamp && (
                            <p className="card-text">
                              <small className="text-muted">Submitted: {new Date(fb.timestamp).toLocaleString()}</small>
                            </p>
                          )}
                          <button className="btn btn-sm btn-secondary me-2" onClick={() => editFeedback(fb)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteFeedback(fb.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        } />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
