import { Router } from "express";
import { productController } from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.get("/", productController.getAll);
productRoutes.get("/:id", productController.getById);
productRoutes.post("/", productController.create);
productRoutes.delete("/:id", productController.delete);
productRoutes.put("/:id", productController.update);


export default productRoutes;