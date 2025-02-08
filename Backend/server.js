const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "studentDB"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// API to save marks
app.post("/add-marks", (req, res) => {
  const marks = req.body.marks; // Expecting an array of marks
  const sql = "INSERT INTO marks (subject, score) VALUES ?";
  const values = marks.map((mark, index) => [`Subject ${index + 1}`, mark]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting marks:", err);
      res.status(500).send({ message: "Failed to insert marks" });
    } else {
      res.send({ message: "Marks added successfully!" });
    }
  });
});

// API to retrieve marks
app.get("/get-marks", (req, res) => {
  const sql = "SELECT * FROM marks";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching marks:", err);
      res.status(500).send({ message: "Failed to fetch marks" });
    } else {
      res.send(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
