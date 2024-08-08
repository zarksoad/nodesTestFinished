import { Router } from "express";
import { container } from "tsyringe";
import { ProductCartController } from "../controllers/productCart.controller";

const productCartRoutes = Router();
const productCartController = container.resolve(ProductCartController);

productCartRoutes.post("/", productCartController.addProduct);
productCartRoutes.delete(
  "/:cartId/:productId",
  productCartController.removeProduct
);
productCartRoutes.put(
  "/:cartId/:productId",
  productCartController.updateQuantity
);

export default productCartRoutes;
