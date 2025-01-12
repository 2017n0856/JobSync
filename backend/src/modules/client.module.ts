import { Module } from '@nestjs/common';
import { ClientService } from 'src/services/client.service';
import { Client } from 'src/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientResolver } from 'src/resolvers/client.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [],
  providers: [ClientResolver, ClientService],
})
export class ClientsModule {}
