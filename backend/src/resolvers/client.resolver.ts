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

  @Query(() => Client, { nullable: true })
  async getClientById(@Args('id') id: number): Promise<Client | null> {
    return await this.clientService.findById(id);
  }

  @Query(() => Client, { nullable: true })
  async getClientByName(@Args('name') name: string): Promise<Client | null> {
    return await this.clientService.findByName(name);
  }

  @Mutation(() => Client)
  async addClient(
    @Args('createClientData') createClientData: CreatePersonInput,
  ): Promise<Client> {
    return await this.clientService.addClient(createClientData);
  }

  @Mutation(() => Client)
  async updateClient(
    @Args('id') id: number,
    @Args('updateData') updateData: CreatePersonInput,
  ): Promise<Client> {
    return await this.clientService.updateClient(id, updateData);
  }

  @Mutation(() => Boolean)
  async deleteClient(@Args('id') id: number): Promise<boolean> {
    return await this.clientService.deleteClient(id);
  }
}
