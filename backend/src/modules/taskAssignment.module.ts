import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';
import { TaskAssignmentResolver } from 'src/resolvers/taskAssignment.resolver';
import { TaskAssignmentService } from 'src/services/taskAssignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskAssignment])],
  controllers: [],
  providers: [TaskAssignmentResolver, TaskAssignmentService],
})
export class TaskAssignmentModule {}
