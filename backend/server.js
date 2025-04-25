import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

// Allows to accept JSON data in the request body
app.use(express.json());

// routes
app.use("/api/products", productRouter);

app.listen(9000, () => {
  connectDB();
  console.log(`Server started at http://localhost:9000`);
});
