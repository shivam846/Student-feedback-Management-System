# 📝 Student Feedback Management System

A web-based application built with **React**, **Flask**, and **Firebase** to collect, manage, and review student feedback. It includes both student and admin interfaces with secure authentication.

---

## 🌐 Live Demo

---

## 🚀 Features

### 🎓 Student Panel
- Secure **login** with Firebase Auth
- Submit feedback with:
  - Name
  - Subject
  - Rating (1–5 stars)
  - Comments
- View, edit, or delete own feedback
- Auto timestamp included on submission

### 👨‍🏫 Admin Panel
- Admin login via Firebase
- View all feedbacks submitted by students
- Search/filter by name or subject
- Delete any feedback
- Responsive card-based layout

### 🏠 Home Page
- Simple landing screen with:
  - 🔹 Student Login button
  - 🔹 Admin Login button

---

## 🔐 Credentials

### 👨‍🎓 Student Login
> Use Firebase email/password accounts (created via Firebase Console)

### 👨‍🏫 Admin Login



---

## 🛠 Tech Stack

| Frontend | Backend | Database/Auth |
|----------|---------|----------------|
| React    | Flask (Python) | Firebase (Firestore + Auth) |
| Bootstrap | Flask-CORS | Firebase Admin SDK |
| React Router | Axios | Service Account JSON |

---

## 📁 Folder Structure
student-feedback-system/
├── frontend/ # React App
│ ├── src/
│ │ ├── App.js
│ │ ├── AdminLogin.js
│ │ ├── AdminDashboard.js
│ │ ├── Home.js
│ │ └── firebase.js
│ └── public/
├── backend/
│ ├── app.py # Flask server
│ └── firebase-key.json


---

## ⚙️ How to Run Locally

### 🔽 Prerequisites
- Node.js + npm
- Python (3.x)
- Firebase project with Firestore + Auth enabled

---

### 🔧 Backend Setup (Flask)
```bash
cd backend
python -m venv venv
venv\\Scripts\\activate  # Windows
pip install -r requirements.txt  # (use pip freeze > requirements.txt to generate)
python app.py

Make sure firebase-key.json is present in backend/


💻 Frontend Setup (React)
cd frontend
npm install
npm start

💡 Future Improvements
Admin login protected route

Feedback sentiment analysis

Pagination for feedback

Email notifications on new feedback

