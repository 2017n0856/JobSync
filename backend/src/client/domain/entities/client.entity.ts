import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IsEmail, IsOptional, IsString, IsEnum, IsJSON } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';
import { Institute } from '../../../institutes/domain/entities/institute.entity';
import { IsPhoneNumber } from '../../../common/validators/phone.validator';

@Entity('clients')
@Index(['name'], { unique: true })
export class Client {
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

  @Column({ type: 'varchar', length: 50, nullable: true })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 