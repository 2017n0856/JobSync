import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAssignmentController } from './controllers/task-assignment.controller';
import { TaskAssignmentService } from './services/task-assignment.service';
import { TaskAssignmentRepository } from './repositories/task-assignment.repository';
import { TaskAssignment } from './domain/entities/task-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskAssignment])],
  controllers: [TaskAssignmentController],
  providers: [TaskAssignmentService, TaskAssignmentRepository],
  exports: [TaskAssignmentService, TaskAssignmentRepository],
})
export class TaskAssignmentModule {} 