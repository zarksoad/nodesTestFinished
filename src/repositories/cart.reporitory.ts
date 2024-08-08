import { Cart } from "../models/cart.model";
import { injectable } from "tsyringe";

@injectable()
export class CartRepository {
  async findById(id: number): Promise<Cart | null> {
    return Cart.findByPk(id);
  }

  async create(cartData: Partial<Cart>): Promise<Cart> {
    return Cart.create(cartData);
  }

  async delete(id: number): Promise<void> {
    await Cart.destroy({ where: { id } });
  }
}
