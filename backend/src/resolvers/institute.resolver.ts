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

  @Query(() => Institute, { nullable: true })
  async getInstituteById(@Args('id') id: number): Promise<Institute | null> {
    return await this.instituteService.findById(id);
  }

  @Query(() => Institute, { nullable: true })
  async getInstituteByName(@Args('name') name: string): Promise<Institute | null> {
    return await this.instituteService.findByName(name);
  }

  @Mutation(() => Institute)
  async addInstitute(
    @Args('createInstituteData') createInstituteData: CreateInstituteInput,
  ): Promise<Institute> {
    return await this.instituteService.addInstitute(createInstituteData);
  }

  @Mutation(() => Institute)
  async updateInstitute(
    @Args('id') id: number,
    @Args('updateData') updateData: CreateInstituteInput,
  ): Promise<Institute> {
    return await this.instituteService.updateInstitute(id, updateData);
  }

  @Mutation(() => Boolean)
  async deleteInstitute(@Args('id') id: number): Promise<boolean> {
    return await this.instituteService.deleteInstitute(id);
  }
}
