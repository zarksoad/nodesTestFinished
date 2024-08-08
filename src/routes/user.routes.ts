import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { OrderController } from "../controllers/order.controller";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";

const userRoutes = Router();

userRoutes.get("/",authorizationMiddleware('get',"users") ,UserController.getAllUsers);
userRoutes.get("/:id",authorizationMiddleware('get',"users"), UserController.getUserById);
userRoutes.post("/",authorizationMiddleware('create',"users"), UserController.createUser);
userRoutes.delete("/:id",authorizationMiddleware('delete',"users"), UserController.deleteUser);
userRoutes.put("/:id",authorizationMiddleware("update","users"), UserController.updateUser);
userRoutes.get("/:id/orders",authorizationMiddleware('get',"users"),OrderController.getOrderByUser)


export default userRoutes;