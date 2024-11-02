
import { Query, Resolver } from '@nestjs/graphql';
import { ClientsService } from 'src/services/client/client.service';
import { Client } from 'src/entities/client/client.entity';

@Resolver(of => Client)
export class ClientsResolver {
  constructor(private clientsService: ClientsService) {}

  @Query(returns => [Client])
  async clients(): Promise<Client[]> {
    return this.clientsService.findAll();
  }
}