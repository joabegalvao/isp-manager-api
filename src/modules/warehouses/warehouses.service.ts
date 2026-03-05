import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse)
    private warehouseModel: typeof Warehouse,
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    // Regra de Negócio: Evitar dois almoxarifados com o exato mesmo nome
    const existingWarehouse = await this.warehouseModel.findOne({
      where: { description: createWarehouseDto.description },
    });

    if (existingWarehouse) {
      throw new ConflictException('Already exists a warehouse with this description.');
    }

    return this.warehouseModel.create({ ...createWarehouseDto });
  }

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseModel.findAll({
      order: [['description', 'ASC']],
    });
  }

  async findOne(id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseModel.findByPk(id);
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found.`);
    }
    return warehouse;
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse> {
    const warehouse = await this.findOne(id);

    if (updateWarehouseDto.description && updateWarehouseDto.description !== warehouse.description) {
      const existingName = await this.warehouseModel.findOne({
        where: { description: updateWarehouseDto.description },
      });

      if (existingName) {
        throw new ConflictException('This description is already being used by another warehouse.');
      }
    }

    return warehouse.update(updateWarehouseDto);
  }

  async remove(id: number): Promise<void> {
    const warehouse = await this.findOne(id);
    await warehouse.destroy();
  }
}