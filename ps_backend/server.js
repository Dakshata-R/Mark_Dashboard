const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sandhiya", 
  database: "login_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// 🟢 Register Route (Stores New Users in DB)
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  console.log("Received Registration Request:");
  console.log("Email:", email);
  console.log("Password:", password);

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Database Insert Error:", err);
      return res.status(500).json({ message: "Server Error" });
    }
    console.log("✅ User Registered Successfully:", email);
    res.json({ message: "User Registered Successfully" });
  });
});

// 🟢 Login Route (Checks if User Exists in DB)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Received Login Request:");
  console.log("Email:", email);
  console.log("Password:", password);

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Database Query Error:", err);
      return res.status(500).json({ message: "Server Error" });
    }

    if (results.length > 0) {
      console.log("✅ Login Successful for:", email);
      res.json({ message: "Login Successful" });
    } else {
      console.log("❌ Invalid Credentials for:", email);
      res.json({ message: "Invalid Credentials" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});