import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity('institute')
export class Institute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @IsOptional()
  country?: string;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  metadata?: Record<string, any>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
