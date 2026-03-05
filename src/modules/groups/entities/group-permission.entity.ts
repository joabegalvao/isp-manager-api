import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Group } from './group.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Table({ tableName: 'group_permissions', timestamps: false })
export class GroupPermission extends Model {
  @ForeignKey(() => Group)
  @Column
  declare groupId: number;

  @ForeignKey(() => Permission)
  @Column
  declare permissionId: number;
}