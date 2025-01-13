import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { TaskResolver } from 'src/resolvers/task.resolver';
import { TaskService } from 'src/services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
