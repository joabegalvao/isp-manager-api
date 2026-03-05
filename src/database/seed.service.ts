import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from '../modules/permissions/entities/permission.entity';
import { Group } from '../modules/groups/entities/group.entity';
import { User } from '../modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission,
    @InjectModel(Group) private groupModel: typeof Group,
    @InjectModel(User) private userModel: typeof User,
    private readonly configService: ConfigService,
  ) { }

  async onApplicationBootstrap() {
    const [adminGroup] = await this.groupModel.findOrCreate({
      where: { name: 'Administrator' },
      defaults: { name: 'Administrator' }
    });

    await this.seedPermissions(adminGroup);

    await this.seedAdminUser(adminGroup.id);

  }

  private async seedPermissions(adminGroup: Group) {
    const defaultPermissions = [
      { name: 'users:view', description: 'View users' },
      { name: 'users:manage', description: 'Manage users' },
      { name: 'groups:manage', description: 'Manage groups' },
      { name: 'clients:view', description: 'View clients' },
      { name: 'clients:manage', description: 'Create and edit clients' },
      { name: 'warehouses:view', description: 'View warehouses' },
      { name: 'warehouses:manage', description: 'Manage warehouses' },
    ];

    for (const perms of defaultPermissions) {
      await this.permissionModel.findOrCreate({
        where: { name: perms.name },
        defaults: perms,
      });
    }

    const allPermissions = await this.permissionModel.findAll();
    await adminGroup.$set('permissions', allPermissions);
  }

  private async seedAdminUser(groupId: number) {
    const adminUser = this.configService.get<string>('FIRST_ADMIN_USERNAME');
    const adminPass = this.configService.get<string>('FIRST_ADMIN_PASSWORD');

    if (!adminUser || !adminPass) {
      console.error('ERROR: FIRST_ADMIN_USERNAME or PASSWORD not defined in .env');
      return;
    }

    const userExists = await this.userModel.findOne({ where: { username: adminUser } });

    if (!userExists) {
      const hashedPassword = await bcrypt.hash(adminPass, 10);
      await this.userModel.create({
        name: 'System Administrator',
        username: adminUser,
        password: hashedPassword,
        groupId: groupId,
        active: true,
      });
    }
  }
}