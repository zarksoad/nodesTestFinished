import {
  Table,
  Model,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { Role } from "./role.model";
import { Cart } from "./cart.model";

@Table({
  tableName: "users",
  timestamps: false,
})
class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(255))
  email!: string;

  @Column(DataType.STRING(255))
  password!: string;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  roleId!: number;
  @BelongsTo(() => Role)
  roles!: Role;
  @HasOne(() => Cart)
  cart!: Cart;
}

export default User;
