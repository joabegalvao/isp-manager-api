import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Group } from '../../groups/entities/group.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare active: boolean;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare groupId: number;

  @BelongsTo(() => Group)
  declare group: Group;
}