import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';
import { PersonType } from '../enums/client.enum';

@Table({ tableName: 'clients', timestamps: true, underscored: true })
export class Client extends Model {
  @Default(true)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isActive: boolean;

  @Column({ type: DataType.ENUM(...Object.values(PersonType)), allowNull: false })
  declare personType: PersonType;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string; 

  @Column({ type: DataType.STRING })
  declare tradeName: string; 

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare document: string; 

  @Column({ type: DataType.STRING })
  declare stateRegistration: string; 

  @Column({ type: DataType.STRING, allowNull: false })
  declare zipCode: string; 

  @Column({ type: DataType.STRING, allowNull: false })
  declare street: string; 

  @Column({ type: DataType.STRING, allowNull: false })
  declare number: string; 

  @Column({ type: DataType.STRING })
  declare complement: string; 

  @Column({ type: DataType.STRING, allowNull: false })
  declare neighborhood: string; 

  @Column({ type: DataType.STRING, allowNull: false })
  declare city: string; 

  @Column({ type: DataType.STRING(2), allowNull: false })
  declare state: string; 

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @Column({ type: DataType.STRING })
  declare mobilePhone: string; 
}