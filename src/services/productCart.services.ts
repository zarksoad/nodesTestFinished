// services/CartService.ts
import { injectable, inject } from "tsyringe";
import { ProductRepository } from "../repositories";
import { ProductCartRepository } from "../repositories/productCart.repository";

@injectable()
export class ProductCartService {
  constructor(
    @inject(ProductCartRepository)
    private productCartRepository: ProductCartRepository,
    @inject(ProductRepository) private productRepository: ProductRepository
  ) {}

  async addProductToCart(
    cartId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    const product = await this.productRepository.getById(productId);
    if (!product) throw new Error("Product not found");

    const existingProductCart = await this.productCartRepository.findByCartId(
      cartId
    );
    const productCart = existingProductCart.find(
      (pc) => pc.productId === productId
    );

    if (productCart) {
      await this.productCartRepository.updateQuantity(
        cartId,
        productId,
        quantity
      );
    } else {
      await this.productCartRepository.create({ cartId, productId, quantity });
    }
  }

  async removeProductFromCart(
    cartId: number,
    productId: number
  ): Promise<void> {
    await this.productCartRepository.delete(cartId, productId);
  }

  async updateProductQuantity(
    cartId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    await this.productCartRepository.updateQuantity(
      cartId,
      productId,
      quantity
    );
  }

  async getCartProducts(cartId: number): Promise<any[]> {
    const productCarts = await this.productCartRepository.findByCartId(cartId);
    return productCarts.map(async (pc) => {
      const product = await this.productRepository.getById(pc.productId);
      if (product) {
        return { ...product.toJSON(), quantity: pc.quantity };
      }
      console.error(`Product with ID ${pc.productId} not found`);
    });
  }
}
