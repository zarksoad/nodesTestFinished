import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import { authJWT } from "../middlewares/authMiddleware";
import productCartRoutes from "./productCart.routes";

const router = Router();

router.use("/login", authRoutes);
router.use("/users", authJWT, userRoutes);
router.use("/products", authJWT, productRoutes);
router.use("/orders", authJWT, orderRoutes);
router.use("/productscarts", authJWT, productCartRoutes);

export default router;
