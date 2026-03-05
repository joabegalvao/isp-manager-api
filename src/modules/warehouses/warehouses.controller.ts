import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { CheckPermissions } from '../auth/decorators/check-permissions.decorator';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  @CheckPermissions('warehouses:manage')
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get()
  @CheckPermissions('warehouses:view')
  findAll() {
    return this.warehousesService.findAll();
  }

  @Get(':id')
  @CheckPermissions('warehouses:view')
  findOne(@Param('id') id: string) {
    return this.warehousesService.findOne(+id);
  }

  @Patch(':id')
  @CheckPermissions('warehouses:manage')
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehousesService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  @CheckPermissions('warehouses:manage')
  remove(@Param('id') id: string) {
    return this.warehousesService.remove(+id);
  }
}