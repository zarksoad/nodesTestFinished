// controllers/ProductCartController.ts
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ProductCartService } from "../services/productCart.services";

const productCartService = container.resolve(ProductCartService);

export class ProductCartController {
  async addProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { cartId, productId, quantity } = req.body;
    try {
      await productCartService.addProductToCart(cartId, productId, quantity);
      res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { cartId, productId } = req.params;
    try {
      await productCartService.removeProductFromCart(
        Number(cartId),
        Number(productId)
      );
      res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      next(error);
    }
  }

  async updateQuantity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    try {
      await productCartService.updateProductQuantity(
        Number(cartId),
        Number(productId),
        quantity
      );
      res.status(200).json({ message: "Product quantity updated" });
    } catch (error) {
      next(error);
    }
  }
}
