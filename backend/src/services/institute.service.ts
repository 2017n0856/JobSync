import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/entities/client.entity';
import { Institute } from 'src/entities/institute.entity';

@Injectable()
export class InstituteService {
  constructor(
    @InjectRepository(Institute)
    private clientsRepository: Repository<Institute>,
  ) {}

}