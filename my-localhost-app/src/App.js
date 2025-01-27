import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./App.css";

// Page before sign-in
function HomePage() {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    navigate("/dashboard"); // Redirect to the dashboard page
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to My Landing Page</h1>
        <p>Your go-to platform for amazing experiences!</p>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
        />
      </header>
    </div>
  );
}

// Page after sign-in
function DashboardPage() {
  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to Your Dashboard</h1>
        <p>You are successfully signed in!</p>
        <Link to="/">Go back to the homepage</Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
