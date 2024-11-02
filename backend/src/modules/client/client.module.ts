import { Module } from '@nestjs/common';
import { ClientsService } from 'src/services/client/client.service';
import { ClientsController } from 'src/controllers/client/client.controller';
import { Client } from 'src/entities/client/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsResolver } from 'src/resolvers/client/client.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsResolver, ClientsService],
})
export class ClientsModule {}
