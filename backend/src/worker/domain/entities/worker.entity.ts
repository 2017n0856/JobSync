import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IsEmail, IsOptional, IsString, IsEnum, IsJSON, IsArray } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';
import { Specialty } from '../../../common/enums/specialty.enum';
import { Institute } from '../../../institutes/domain/entities/institute.entity';
import { IsPhoneNumber } from '../../../common/validators/phone.validator';

@Entity('workers')
@Index(['name'], { unique: true })
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  name: string;

  @Column({ type: 'enum', enum: Country })
  @IsEnum(Country)
  country: Country;

  @Column({ type: 'varchar', length: 20 })
  @IsPhoneNumber()
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Column({ type: 'int', nullable: true })
  instituteId?: number;

  @ManyToOne(() => Institute, { nullable: true })
  @JoinColumn({ name: 'instituteId' })
  institute?: Institute;

  @Column({ type: 'json', nullable: true })
  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @Column({ type: 'simple-array', nullable: true })
  @IsArray()
  @IsEnum(Specialty, { each: true })
  @IsOptional()
  specialties?: Specialty[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 