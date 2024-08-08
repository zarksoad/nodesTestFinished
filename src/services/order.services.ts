import Iorder from "../interfaces/order";
import { inject, injectable } from "tsyringe";
import { OrderReppository } from "../repositories/order.repository";
import { Order } from "../models/order.model";

@injectable()
export class OrderService {
    constructor(
        @inject(OrderReppository) private orderReppository: OrderReppository
    ) { }

    async getAll(): Promise<Order[]> {
        return await this.orderReppository.getAll();
    };

    async getById(id: number): Promise<Order | null> {
        return await this.orderReppository.getById(id);
    };

    async create({ userId, productCartId }: Iorder): Promise<Order> {
        return await this.orderReppository.create({ userId, productCartId });
    };


    async delete(id: number): Promise<void> {
        return await this.orderReppository.delete(id)
    };

    async update(id: number, order: Iorder): Promise<void> {
        return await this.orderReppository.update(id, order)
    };

    async getOrderByUser(userId: number): Promise<Order[]> {
        return await this.orderReppository.getOrderByUser(userId);
    };

}