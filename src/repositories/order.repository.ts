import { Order } from './../models/order.model';
import { injectable } from "tsyringe";
import Iorder from '../interfaces/order';
import User from '../models/user.model';


@injectable()
export class OrderReppository {
    async getAll(): Promise<Order[]> {
        return Order.findAll()
    }

    async getById(id: number): Promise<Order | null> {
        return Order.findByPk(id);
    }

    async create({ userId, productCartId }: Iorder): Promise<Order> {
        return Order.create({ userId, productCartId });
    }
    async delete(id: number): Promise<void> {
        await Order.destroy({ where: { id } });
    }

    async update(id: number, order: Iorder): Promise<void> {
        await Order.update(order, { where: { id } });
    }
   
    async getOrderByUser(userId: number): Promise<Order[]> {
        return await Order.findAll({
            where: { userId },
            attributes: ["userId", "productCartId"],
            include: [
                {
                    model: User,
                    as: "users",
                    required: true,
                    attributes: ["id", "email"]
                },
            ],
        });
    }
}