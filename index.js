const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { dbConnect } = require("./db.js");
const studentRoute = require("./routes/student.js");
const mentorRoute = require("./routes/mentor.js");
const assignRoute = require("./routes/assign.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/all", (req, res) => {
  res.send("Working fine...");
});
app.use("/student",studentRoute);
app.use("/mentor",mentorRoute);
app.use("/assignmentor",assignRoute);

app.listen(8111, async (err) => {
  await dbConnect();
  console.log("Started server ");
  if (err) {
    console.log(err, "error in starting server");
  }
});