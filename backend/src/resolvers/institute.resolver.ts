// src/resolvers/client.resolver.ts
import {  Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from 'src/common/exceptions.filter';
import { Institute } from 'src/entities/institute.entity';
import { InstituteService } from 'src/services/institute.service';

@Resolver(of => Institute)
@UseFilters(new GraphqlExceptionFilter())
export class InstituteResolver {
  constructor(private instituteService: InstituteService) {}

}
