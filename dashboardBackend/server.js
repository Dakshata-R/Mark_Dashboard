const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const db = require("./db"); 
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON data handling

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Use PORT from .env file
const PORT=5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/add-student", (req, res) => {
    const { name, subject1, subject2, subject3, subject4, subject5 } = req.body;
  
    if (!name || !subject1 || !subject2 || !subject3 || !subject4 || !subject5) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const sql = "INSERT INTO students (name, subject1, subject2, subject3, subject4, subject5) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, subject1, subject2, subject3, subject4, subject5];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "Student added successfully", studentId: result.insertId });
    });
  });

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json(result);
    });
  });

app.put("/update-student/:id", (req, res) => {
    const studentId = req.params.id;
    const { name, subject1, subject2, subject3, subject4, subject5 } = req.body;
  
    if (!name || !subject1 || !subject2 || !subject3 || !subject4 || !subject5) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const sql = "UPDATE students SET name=?, subject1=?, subject2=?, subject3=?, subject4=?, subject5=? WHERE id=?";
    const values = [name, subject1, subject2, subject3, subject4, subject5, studentId];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Student updated successfully" });
    });
  });

app.delete("/delete-student/:id", (req, res) => {
    const studentId = req.params.id;
    const sql = "DELETE FROM students WHERE id=?";
  
    db.query(sql, studentId, (err, result) => {
      if (err) {
        console.error("Error deleting data:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Student deleted successfully" });
    });
  });
  
  