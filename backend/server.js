import express from "express";

const app = express();

app.get("/products", (req, res) => {
  res.send(`Server is ready`);
});

app.listen(9000, () => {
  console.log(`Server started at http://localhost:9000`);
});
