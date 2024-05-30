import express from "express";

const app = express();
const port = 8001;

app.get("/hello", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
