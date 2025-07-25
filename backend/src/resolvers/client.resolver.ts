import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientService } from 'src/services/client.service';
import { CreatePersonInput } from 'src/types/person.type';
import { Client } from 'src/entities/client.entity';

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query(() => [Client])
  async getClients(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Mutation(() => Client)
  async addClient(
    @Args('createClientData') createClientData: CreatePersonInput,
  ): Promise<Client> {
    return await this.clientService.addClient(createClientData);
  }
}
