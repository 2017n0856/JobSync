import { Task } from 'src/entities/task.entity';
import { TaskAssignment } from 'src/entities/taskAssignment.entity';
import { TaskStatus } from 'src/shared/constants';
import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
  } from 'typeorm';
  
  @EventSubscriber()
  export class TaskAssignmentSubscriber
    implements EntitySubscriberInterface<TaskAssignment>
  {
    listenTo() {
      return TaskAssignment;
    }

    async afterInsert(event: InsertEvent<TaskAssignment>) {
      const taskId = event.entity.task_id;
      const taskRepository = event.manager.getRepository(Task);
      const task = await taskRepository.findOne({
        where: { id: taskId },
        relations: ['assignments'],
      });
  
      if (task && task.status === TaskStatus.Unassigned) {
        task.status = TaskStatus.InProgress;
        await taskRepository.save(task);
      }
    }
  
    async afterUpdate(event: UpdateEvent<TaskAssignment>) {
      const taskId = event.entity?.task_id;
  
      if (!taskId) return;
  
      const taskRepository = event.manager.getRepository(Task);
      const task = await taskRepository.findOne({ where: { id: taskId } });
  
      if (task && task.status === TaskStatus.Unassigned) {
        task.status = TaskStatus.InProgress;
        await taskRepository.save(task);
      }
    }
  }
  