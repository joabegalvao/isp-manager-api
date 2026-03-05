import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CheckPermissions } from '../auth/decorators/check-permissions.decorator';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @CheckPermissions('clients:manage')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @CheckPermissions('clients:view')
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @CheckPermissions('clients:view')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @CheckPermissions('clients:manage')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @CheckPermissions('clients:manage')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
