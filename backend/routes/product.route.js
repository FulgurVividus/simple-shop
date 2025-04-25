import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

// GET
productRouter.get("/", getProducts);

// POST
productRouter.post("/", createProduct);

// PUT
productRouter.put("/:id", updateProduct);

// DELETE
productRouter.delete("/:id", deleteProduct);

export default productRouter;
