import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserService } from "../services/user.services";

@injectable()
export class UserController {
    static async getAllUsers(_: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const userService = container.resolve(UserService);
            const users = await userService.getAllUsers();
            if (!users) {
                res.status(404).json({ message: "No users found" });
            }
            res.status(200).json({
                status: 200,
                data: users,
                message: "Users retrieved successfully.",
            });
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const userService = container.resolve(UserService);
            const user = await userService.getUserById(parseInt(id));
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({
                status: 200,
                data: user,
                message: "User retrieved successfully.",
            });
        } catch (error) {
            next(error)
        }
    }

    static async createUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { email, password, roleId } = req.body;
            const userService = container.resolve(UserService);
            const user = await userService.createUser({email, password,roleId });
            res.status(201).json({
                status: 201,
                data: user,
                message: "User created successfully.",
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const userService = container.resolve(UserService);
            const user = await userService.deleteUser(parseInt(id));
            console.log(user,"asdasdasdsadsdasd")
            res.status(204).json({
                status: 204,
                message: "User deleted successfully.",
            })
        } catch (error) {
            console.error(error);
            next(error)
        }
    }

    static async updateUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { email, password,roleId } = req.body;
            const userService = container.resolve(UserService);
            await userService.updateUser(parseInt(id), { email, password,roleId });
            res.status(200).json({
                status: 200,
                message: "User updated successfully.",
            });
        } catch (error) {
            next(error)
        }
    }
   
}