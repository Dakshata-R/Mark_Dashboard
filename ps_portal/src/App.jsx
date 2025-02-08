import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import Courses from "./courses";
import { Container, Button } from "@mui/material";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

// Login/Register Toggle
const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container>
      {showLogin ? <Login /> : <Register />}
      <Button fullWidth sx={{ mt: 2 }} onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Go to Register" : "Go to Login"}
      </Button>
    </Container>
  );
};
