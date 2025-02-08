import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css"; // Importing custom CSS

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/add-student", formData);
      alert("Student added successfully!");
      setFormData({ name: "", subject1: "", subject2: "", subject3: "", subject4: "", subject5: "" });
    } catch (error) {
      alert("Failed to add student");
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Home Page</h1>

      {/* Student Form */}
      <form onSubmit={handleSubmit} className="student-form">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" required />
        <input type="number" name="subject1" value={formData.subject1} onChange={handleChange} placeholder="Subject 1 Marks" required />
        <input type="number" name="subject2" value={formData.subject2} onChange={handleChange} placeholder="Subject 2 Marks" required />
        <input type="number" name="subject3" value={formData.subject3} onChange={handleChange} placeholder="Subject 3 Marks" required />
        <input type="number" name="subject4" value={formData.subject4} onChange={handleChange} placeholder="Subject 4 Marks" required />
        <input type="number" name="subject5" value={formData.subject5} onChange={handleChange} placeholder="Subject 5 Marks" required />

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Go to Dashboard Button */}
      <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>
    </div>
  );
}

export default Home;
