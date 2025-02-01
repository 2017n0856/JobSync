import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GlobalExceptionFilter } from 'src/common/exceptions.filter';
import { Institute } from 'src/entities/institute.entity';
import { InstituteService } from 'src/services/institute.service';
import { CreateInstituteInput } from 'src/types/institute.type';

@Resolver(of => Institute)
@UseFilters(new GlobalExceptionFilter())
export class InstituteResolver {
  constructor(private instituteService: InstituteService) {}

  @Query(()=>[Institute])
  async getInstitutes(): Promise<Institute[]> {
    const data = await this.instituteService.findAll();
    return data;
  }

  @Mutation(returns => Institute)
  async addInstitute(
    @Args('createInstituteData') createInstituteData: CreateInstituteInput,
  ): Promise<Institute> {
    return this.instituteService.addInstitute(createInstituteData);
  }

}
