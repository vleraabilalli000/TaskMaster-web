const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "taskmaster"
});


db.connect(err => {
  if (err) {
    console.log("Gabim në lidhje:", err);
  } else {
    console.log("Lidhja me MySQL u krye me sukses!");
  }
});


app.get("/", (req, res) => {
  res.send("Backend po funksionon si duhet!");
});


app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description || "", "Pending"],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        title,
        description: description || "",
        status: "Pending",
        created_at: new Date()
      });
    }
  );
});


app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//test ne perditesim

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon ➝ http://localhost:${PORT}`);
});
