import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Group } from '../groups/entities/group.entity';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userModel.findOne({ 
      where: { username: createUserDto.username } 
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { username },
      include: [Group],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
