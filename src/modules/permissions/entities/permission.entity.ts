import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Group } from '../../groups/entities/group.entity';
import { GroupPermission } from '../../groups/entities/group-permission.entity';

@Table({ tableName: 'permissions' })
export class Permission extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string; 

  @Column(DataType.STRING)
  declare description: string;

  @BelongsToMany(() => Group, () => GroupPermission)
  declare groups: Group[];
}