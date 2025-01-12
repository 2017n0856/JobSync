import { Module } from '@nestjs/common';
import { ClientsService } from 'src/services/client.service';
import { Client } from 'src/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsResolver } from 'src/resolvers/client.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [],
  providers: [ClientsResolver, ClientsService],
})
export class ClientsModule {}
