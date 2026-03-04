import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { PERMISSIONS_KEY } from '../decorators/check-permissions.decorator';
import { Group } from '../../groups/entities/group.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Group)
    private groupModel: typeof Group,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.groupId) {
      return false;
    }

    const group = await this.groupModel.findByPk(user.groupId, {
      include: [{
        model: Permission,
        attributes: ['name'],
        through: { attributes: [] }
      }]
    });

    if (!group) {
      throw new ForbiddenException('User group not found.');
    }

    const userPermissions = group.permissions.map(p => p.name);
    const hasPermission = requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenException('You do not have permission to perform this action.');
    }

    return true;
  }
}