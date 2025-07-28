import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAssignment } from '../domain/entities/task-assignment.entity';

@Injectable()
export class TaskAssignmentRepository {
  constructor(
    @InjectRepository(TaskAssignment)
    private readonly taskAssignmentRepository: Repository<TaskAssignment>,
  ) {}

  async create(taskAssignmentData: Partial<TaskAssignment>): Promise<TaskAssignment> {
    const taskAssignment = this.taskAssignmentRepository.create(taskAssignmentData);
    return await this.taskAssignmentRepository.save(taskAssignment);
  }

  async findById(id: number): Promise<TaskAssignment | null> {
    return await this.taskAssignmentRepository.findOne({ 
      where: { id },
      relations: ['task', 'worker']
    });
  }

  async findByTaskId(taskId: number): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.find({ 
      where: { taskId },
      relations: ['task', 'worker']
    });
  }

  async findByWorkerId(workerId: number): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.find({ 
      where: { workerId },
      relations: ['task', 'worker']
    });
  }

  async findAll(): Promise<TaskAssignment[]> {
    return await this.taskAssignmentRepository.find({
      relations: ['task', 'worker']
    });
  }

  async update(id: number, updateData: Partial<TaskAssignment>): Promise<TaskAssignment | null> {
    await this.taskAssignmentRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.taskAssignmentRepository.delete(id);
    return result.affected > 0;
  }
} 