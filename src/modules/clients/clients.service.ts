import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor (
    @InjectModel(Client) 
    private clientModel: typeof Client,
  ){}

  async create(createClientDto: CreateClientDto) {
    const existingClient = await this.clientModel.findOne({ 
    where: { document: createClientDto.document } });

    if (existingClient) {
      throw new ConflictException('Client with this document already exists');
    }

    const client = await this.clientModel.create({...createClientDto});
    return client;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientModel.findAll();
    return clients;
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientModel.findByPk(id);
    if (!client) {
      throw new ConflictException('Client not found');
    }
    return client;
  }


  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientModel.findByPk(id);
    if (!client) {
      throw new ConflictException('Client not found');
    }
    await client.update(updateClientDto);
    return client;
  }

  async remove(id: number) {
    const client = await this.clientModel.findByPk(id);
    if (!client) {
      throw new ConflictException('Client not found');
    }
    await client.destroy();
    return true
  }
}
