import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty({ message: 'Group name is required' })
  name: string;
}