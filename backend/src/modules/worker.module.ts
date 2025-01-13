import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from 'src/entities/worker.entity';
import { WorkerService } from 'src/services/worker.service';
import { WorkerResolver } from 'src/resolvers/worker.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  controllers: [],
  providers: [WorkerResolver, WorkerService],
})
export class WorkerModule {}
