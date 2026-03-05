import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { PersonType } from '../enums/client.enum';

export class CreateClientDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(PersonType, { message: 'personType must be INDIVIDUAL or COMPANY' })
  @IsNotEmpty()
  personType: PersonType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  tradeName?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  document: string; 

  @IsString()
  @IsOptional()
  stateRegistration?: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  mobilePhone?: string;
}