import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerController } from './controllers/worker.controller';
import { WorkerService } from './services/worker.service';
import { WorkerRepository } from './repositories/worker.repository';
import { Worker } from './domain/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  controllers: [WorkerController],
  providers: [WorkerService, WorkerRepository],
  exports: [WorkerService, WorkerRepository],
})
export class WorkersModule {}
