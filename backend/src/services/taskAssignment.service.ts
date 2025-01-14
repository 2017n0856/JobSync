import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';

@Injectable()
export class TaskAssignmentService {
  constructor(
    @InjectRepository(TaskAssignment)
    private clientsRepository: Repository<TaskAssignment>,
  ) {}

}