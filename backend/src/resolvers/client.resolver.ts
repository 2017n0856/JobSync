import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ClientService } from 'src/services/client.service';
import { Client } from 'src/entities/client.entity';
import { CreatePersonInput } from 'src/types/person.type';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';

@Resolver(of => Client)
@UseFilters(new GraphqlExceptionFilter())
export class ClientResolver {
  constructor(private clientService: ClientService) {}

  @Query(()=>[Client])
  async getClients(): Promise<Client[]> {
    const data = await this.clientService.findAll();
    return data;
  }

  @Mutation(returns => Client)
  async addClient(
    @Args('createClientData') createClientData: CreatePersonInput,
  ): Promise<Client> {
    return this.clientService.addClient(createClientData);
  }
}
