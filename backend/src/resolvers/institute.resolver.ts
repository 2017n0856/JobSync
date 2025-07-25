import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InstituteService } from 'src/services/institute.service';
import { CreateInstituteInput } from 'src/types/institute.type';
import { Institute } from 'src/entities/institute.entity';

@Resolver(() => Institute)
export class InstituteResolver {
  constructor(private readonly instituteService: InstituteService) {}

  @Query(() => [Institute])
  async getInstitutes(): Promise<Institute[]> {
    return await this.instituteService.findAll();
  }

  @Mutation(() => Institute)
  async addInstitute(
    @Args('createInstituteData') createInstituteData: CreateInstituteInput,
  ): Promise<Institute> {
    return await this.instituteService.addInstitute(createInstituteData);
  }
}
