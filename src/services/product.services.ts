import { Product } from './../models/product.model';
import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../repositories/product.repository";
import Iproduct from "../interfaces/product";

@injectable()
export class ProductService{
    constructor(
        @inject(ProductRepository) private productReppository: ProductRepository
    ) { }

    async getAll(): Promise<Product[]> {
        return await this.productReppository.getAll();
    };

    async getById(id: number): Promise<Product| null> {
        return await this.productReppository.getById(id);
    };

    async create({ name, price, descripcion, stock }: Iproduct): Promise<Product> {
        return await this.productReppository.create({ name, price, descripcion, stock });
    };


    async delete(id: number): Promise<void> {
        return await this.productReppository.delete(id)
    };

    async update(id: number, product: Iproduct): Promise<void> {
        return await this.productReppository.update(id, product)
    };
}