import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, LogLevel, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class CustomLogger extends ConsoleLogger {
  private readonly allowedLogs: LogLevel[] = [
    'log',
    'warn',
    'error',
    'debug',
    'verbose',
  ];

  log(message: string, context?: string) {
    if (
      !context?.includes('InstanceLoader') &&
      !context?.includes('NestFactory')
    ) {
      super.log(message, context);
    }
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('JobSync API')
    .setDescription('JobSync GraphQL and REST API documentation')
    .setVersion('1.0')
    .addTag('GraphQL', 'GraphQL endpoints')
    .addTag('REST', 'REST API endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 API Documentation: http://localhost:${process.env.PORT ?? 3000}/api-docs`);
  console.log(`🔍 GraphQL Playground: http://localhost:${process.env.PORT ?? 3000}/graphql`);
}
bootstrap();
