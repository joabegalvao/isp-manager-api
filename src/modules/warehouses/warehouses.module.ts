import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Warehouse } from './entities/warehouse.entity';

@Module({
  imports: [SequelizeModule.forFeature([Warehouse])],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
