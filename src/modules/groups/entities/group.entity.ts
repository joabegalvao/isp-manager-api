import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { GroupPermission } from './group-permission.entity';

@Table({ tableName: 'groups' })
export class Group extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @HasMany(() => User)
  declare users: User[];

  @BelongsToMany(() => Permission, () => GroupPermission)
  permissions: Permission[];
}