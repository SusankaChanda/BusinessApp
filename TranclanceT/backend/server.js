const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/step1", async (req, res) => {
  const { step1Data } = req.body;
  res.send(step1Data);
});

app.post("step2", async (req, res) => {
  const { step2Data } = req.body;
  res.send(step2Data);
});

app.listen(5000, () => {
  console.log("Server is Running at port 5000");
});
