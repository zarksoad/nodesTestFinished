import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import { Role } from "./role.model";
import { Entity } from "./entity.model"; // Define este modelo según tu estructura

@Table({
  tableName: "permissions",
  timestamps: false,
})
export class Permission extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  roleId!: number;

  @ForeignKey(() => Entity)
  @Column(DataType.INTEGER)
  entityId!: number;

  @Column(DataType.BOOLEAN)
  canCreate!: boolean;

  @Column(DataType.BOOLEAN)
  canUpdate!: boolean;

  @Column(DataType.BOOLEAN)
  canDelete!: boolean;

  @Column(DataType.BOOLEAN)
  canGet!: boolean;
}
