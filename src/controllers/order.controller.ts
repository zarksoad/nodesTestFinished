import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { OrderService } from "../services/order.services";


@injectable()
export class OrderController {
    static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productService = container.resolve(OrderService);
            const products = await productService.getAll();
            if (!products) {
                res.status(404).json({ message: "No found" });
            }
            res.status(200).json({
                status: 200,
                data: products,
                message: "retrieved successfully.",
            });
        } catch (error) {
            next(error)
        }
    }

    static async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const orderService = container.resolve(OrderService);
            const order = await orderService.getById(parseInt(id));
            if (!order) {
                res.status(404).json({ message: "not found" });
            }
            res.status(200).json({
                status: 200,
                data: order,
                message: "retrieved successfully.",
            });
        } catch (error) {
            next(error)
        }
    }

    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { userId, productCartId } = req.body;
            const orderService = container.resolve(OrderService);
            const user = await orderService.create({ userId, productCartId });
            res.status(201).json({
                status: 201,
                data: user,
                message: "created successfully.",
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const orderService = container.resolve(OrderService);
            const user = await orderService.delete(parseInt(id));
            console.log(user, "asdasdasdsadsdasd")
            res.status(204).json({
                status: 204,
                message: "deleted successfully.",
            })
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async update(req: Request,
        res: Response,
        next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { userId, productCartId } = req.body;
            const orderService = container.resolve(OrderService);
            await orderService.update(parseInt(id), { userId, productCartId });
            res.status(200).json({
                status: 200,
                message: "updated successfully.",
            });
        } catch (error) {
            next(error)
        }
    }

    static async getOrderByUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const orderService = container.resolve(OrderService);;
            const products = await orderService.getOrderByUser(parseInt(id));
            res.status(200).json({
                status: 200,
                data: products,
                message: "Order retrieved successfully.",
            });
        } catch (error) {
           next(error)
        }
    }
}