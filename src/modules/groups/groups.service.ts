import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private groupModel: typeof Group,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const groupExists = await this.groupModel.findOne({ 
      where: { name: createGroupDto.name } 
    });

    if (groupExists) {
      throw new BadRequestException('Group already exists');
    }
    return this.groupModel.create({...createGroupDto});
  }

  findAll() {
    return this.groupModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
