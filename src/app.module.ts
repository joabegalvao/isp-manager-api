import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupPermission } from './modules/groups/entities/group-permission.entity';
import { Group } from './modules/groups/entities/group.entity';
import { Permission } from './modules/permissions/entities/permission.entity';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { PermissionsGuard } from './modules/auth/guards/permissions.guard';
import { SeedService } from './database/seed.service';
import { ClientsModule } from './modules/clients/clients.module';
import { Client } from './modules/clients/entities/client.entity';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { Warehouse } from './modules/warehouses/entities/warehouse.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Group, Permission, GroupPermission, Client, Warehouse],
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
      define: {
        timestamps: true,
        underscored: true,
      },
    }),
    SequelizeModule.forFeature([User, Group, Permission]),
    UsersModule,
    GroupsModule,
    PermissionsModule,
    AuthModule,
    ClientsModule,
    WarehousesModule,
  ],
  providers: [
    SeedService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    },
    {
    provide: APP_GUARD,
    useClass: PermissionsGuard, 
  },
  ],
})
export class AppModule { }