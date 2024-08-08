import { Cart } from "./cart.model";
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";
import { Product } from "./product.model";

@Table({
  tableName: "productCarts",
  timestamps: false,
})
export class ProductCart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Cart)
  @Column(DataType.INTEGER)
  cartId!: number;
  @BelongsTo(() => Cart)
  carts!: User;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId!: number;
  @BelongsTo(() => Product)
  products!: User;

  @Column(DataType.INTEGER)
  quantity!: number;

  
}
