import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IsEmail, IsOptional, IsString, IsEnum, IsJSON, IsArray } from 'class-validator';
import { Country } from '../../../common/enums/country.enum';
import { Currency } from '../../../common/enums/currency.enum';
import { Specialty } from '../../../common/enums/specialty.enum';
import { Institute } from '../../../institutes/domain/entities/institute.entity';
import { IsPhoneNumber } from '../../../common/validators/phone.validator';

@Entity('worker')
@Index(['name'], { unique: true })
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  name: string;

  @Column({ type: 'enum', enum: Country })
  @IsEnum(Country)
  country: Country;

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Column({ type: 'enum', enum: Currency, default: Currency.AUD, nullable: true })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @Column({ name: 'institute_id', type: 'int', nullable: true })
  instituteId?: number;

  @ManyToOne(() => Institute, { nullable: true })
  @JoinColumn({ name: 'institute_id' })
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 