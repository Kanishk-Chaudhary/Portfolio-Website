const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { connect, closeConnection, addMessage } = require("./db");

const PORT = process.env.PORT;

const path = require("path");
dotenv.config();
app.set("views", "./public");
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "public", "index.ejs"), {
    API_URL: process.env.BACKEND_URL,
  });
});

app.post("/api/contact", async (req, res) => {
  if (!req.body) res.status(500).send("Empty form");
  const { name, email, message } = req.body;
  const data = { name, email, message };
  console.log(name, email, message);
  await connect();
  await addMessage(data);
  await closeConnection();
  res.end();
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
