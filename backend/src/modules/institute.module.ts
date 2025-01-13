import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institute } from 'src/entities/institute.entity';
import { InstituteResolver } from 'src/resolvers/institute.resolver';
import { InstituteService } from 'src/services/institute.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institute])],
  controllers: [],
  providers: [InstituteResolver, InstituteService],
})
export class InstituteModule {}
