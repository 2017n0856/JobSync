import { Controller, Get } from '@nestjs/common';
import { ClientsService } from 'src/services/client/client.service';
import { Client } from 'src/entities/client/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  getAllClients(): Promise<Client[]> {
    return this.clientsService.findAll();
  }
}