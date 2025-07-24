import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';
import { CreateTaskAssignmentInput } from 'src/types/taskAssignment.type';

@Injectable()
export class TaskAssignmentService {
  constructor(
    @InjectRepository(TaskAssignment)
    private taskAssignmentRepository: Repository<TaskAssignment>,
  ) {}

  async findAll(): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.find();
  }

  async addTaskAssignment(
    createTaskAssignmentData: CreateTaskAssignmentInput,
  ): Promise<TaskAssignment> {
    const taskAssignment = this.taskAssignmentRepository.create(
      createTaskAssignmentData,
    );
    return await this.taskAssignmentRepository.save(taskAssignment);
  }
}
