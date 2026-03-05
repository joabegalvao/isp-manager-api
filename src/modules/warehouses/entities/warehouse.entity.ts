import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({ tableName: 'warehouses', timestamps: true, underscored: true })
export class Warehouse extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string; 

  @Default(true)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isActive: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isMain: boolean; 
}