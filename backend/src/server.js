const express = require("express");
const cors = require("cors");
const pool = require("./db/index");

const usersRoutes = require("./routes/users.routes");

const app = express();


// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));


app.use(express.json());


// ROUTES
console.log(usersRoutes);
app.use("/users", usersRoutes);


// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});


// CREATE TABLE
const initDB = async () => {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
      )
    `);

    console.log("Database initialized");

  } catch (error) {
    console.error(error);
  }
};

initDB();


// START SERVER
app.listen(3000, () => {
  console.log("Backend running on port 3000");
});