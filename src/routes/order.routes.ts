import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
const orderRoutes = Router();

orderRoutes.get(
  "/",
  authorizationMiddleware("get", "orders"),
  OrderController.getAll
);
orderRoutes.get(
  "/:id",
  authorizationMiddleware("get", "orders"),
  OrderController.getById
);
orderRoutes.post(
  "/",
  authorizationMiddleware("create", "orders"),
  OrderController.create
);
orderRoutes.delete(
  "/:id",
  authorizationMiddleware("delete", "orders"),
  OrderController.delete
);
orderRoutes.put(
  "/:id",
  authorizationMiddleware("update", "orders"),
  OrderController.update
);

export default orderRoutes;
