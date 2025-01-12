// src/resolvers/client.resolver.ts
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ClientsService } from 'src/services/client.service';
import { Client } from 'src/entities/client.entity';
import { CreateClientInput } from 'src/types/client.type';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';
import { sendResponse } from 'src/common/utils';

@Resolver(of => Client)
@UseFilters(new GraphqlExceptionFilter())
export class ClientsResolver {
  // constructor(private clientsService: ClientsService) {}

  // @Query() // Do not pass the type argument directly in the decorator
  // async clients(): Promise<<Client[]>> {
  //   const data = await this.clientsService.findAll();
  //   sendResponse(data, 'Clients Fetched Successfully', true);
  // }

  // @Mutation(returns => Response) // Do not pass the type argument directly in the decorator
  // async addClient(
  //   @Args('createClientData') createClientData: CreateClientInput,
  // ): Promise<Response<Client>> {
  //   const client = await this.clientsService.addClient(createClientData);
  //   return {
  //     status: true,
  //     message: 'Client added successfully',
  //     data: client,
  //   };
  // }
}
