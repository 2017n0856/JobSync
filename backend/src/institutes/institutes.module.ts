import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstituteController } from './controllers/institute.controller';
import { InstituteService } from './services/institute.service';
import { InstituteRepository } from './repositories/institute.repository';
import { Institute } from './domain/entities/institute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institute])],
  controllers: [InstituteController],
  providers: [InstituteService, InstituteRepository],
  exports: [InstituteService, InstituteRepository],
})
export class InstitutesModule {}
