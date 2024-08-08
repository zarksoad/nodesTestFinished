import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "../models/user.model";
import { Role } from "../models/role.model";
import { Entity } from "../models/entity.model";
import { Permission } from "../models/permissions";
import { Cart } from "../models/cart.model";
import { Order, Product, ProductCart } from "../models";

dotenv.config();

const sequelize: Sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
  models: [User, Role,Entity,Permission,Cart,ProductCart,Order,Product],
});

export default sequelize;
