import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { ProductService } from "../services/product.services";


@injectable()
export class productController {
    static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productService = container.resolve(ProductService);
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
            const productService = container.resolve(ProductService);
            const product = await productService.getById(parseInt(id));
            if (!product) {
                res.status(404).json({ message: "not found" });
            }
            res.status(200).json({
                status: 200,
                data: product,
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
            const { name, price, descripcion, stock } = req.body;
            console.log(req.body,"..............")
            const productService = container.resolve(ProductService);
            const user = await productService.create({ name, price, descripcion, stock });
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
            const productService = container.resolve(ProductService);
            const user = await productService.delete(parseInt(id));
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
            const { name, price, descripcion, stock } = req.body;
            const productService = container.resolve(ProductService);
            await productService.update(parseInt(id), { name, price, descripcion, stock });
            res.status(200).json({
                status: 200,
                message: "updated successfully.",
            });
        } catch (error) {
            next(error)
        }
    }
}