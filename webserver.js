require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// middleware
app.use(express.json());

// routes api for user
app.use("/api/users", require("./routes/user.routes"));

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
