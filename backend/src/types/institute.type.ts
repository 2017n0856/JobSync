import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { NormalizeCountry } from 'src/common/transformers';
import { IsValidCountry } from 'src/common/decorators';

@InputType()
export class CreateInstituteInput {
  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @NormalizeCountry()
  @IsString({ message: 'Invalid country name.' })
  @IsValidCountry({ message: 'Invalid country' })
  country: string;
}
