import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { User } from './entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { GroupPermission } from '../groups/entities/group-permission.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Group, Permission, GroupPermission])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
