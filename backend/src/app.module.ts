import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './modules/client.module';
import { WorkerModule } from './modules/worker.module';
import { TaskModule } from './modules/task.module';
import { InstituteModule } from './modules/institute.module';
import { TaskAssignmentModule } from './modules/taskAssignment.module';
import { TaskAssignmentSubscriber } from './common/subscribers';
import { formatError } from './common/utils';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLLoggingInterceptor } from './common/logging.interceptor';

@Module({
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphQLLoggingInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This ensures that config is available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'jobsync',
      autoLoadEntities: true,
      synchronize: true,
      subscribers: [TaskAssignmentSubscriber],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: formatError,
    }),
    ClientModule, WorkerModule, TaskModule, InstituteModule, TaskAssignmentModule
  ],
})


export class AppModule {}
