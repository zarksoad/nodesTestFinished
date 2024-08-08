import { injectable } from "tsyringe";
import { ProductCart } from "../models/productCart";

@injectable()
export class ProductCartRepository {
  async findByCartId(cartId: number): Promise<ProductCart[]> {
    return ProductCart.findAll({ where: { cartId } });
  }

  async create(productCartData: Partial<ProductCart>): Promise<ProductCart> {
    return ProductCart.create(productCartData);
  }

  async updateQuantity(
    cartId: number,
    productId: number,
    quantity: number
  ): Promise<[number, ProductCart[]]> {
    return ProductCart.update(
      { quantity },
      { where: { cartId, productId }, returning: true }
    );
  }

  async delete(cartId: number, productId: number): Promise<void> {
    await ProductCart.destroy({ where: { cartId, productId } });
  }
}
