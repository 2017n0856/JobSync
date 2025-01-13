// src/resolvers/client.resolver.ts
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ClientService } from 'src/services/client.service';
import { Client } from 'src/entities/client.entity';
import { CreateClientInput } from 'src/types/client.type';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';

@Resolver(of => Client)
@UseFilters(new GraphqlExceptionFilter())
export class ClientResolver {
  constructor(private clientService: ClientService) {}

  @Query(()=>[Client])
  async clients(): Promise<Client[]> {
    const data = await this.clientService.findAll();
    return data;
  }

  @Mutation(returns => Client)
  async addClient(
    @Args('createClientData') createClientData: CreateClientInput,
  ): Promise<Client> {
    const client = await this.clientService.addClient(createClientData);
    return client;
  }
}
