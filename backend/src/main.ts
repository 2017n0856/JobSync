import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('JobSync API')
    .setDescription('JobSync Backend API with NestJS, PostgreSQL, and Redis')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  // Color codes for beautiful console output
  const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fg: {
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m'
    },
    bg: {
      black: '\x1b[40m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m'
    }
  };

  console.log('\n' + '='.repeat(60));
  console.log(`${colors.fg.cyan}${colors.bright}🚀 JobSync API Server Started Successfully!${colors.reset}`);
  console.log('='.repeat(60));
  console.log(`${colors.fg.green}${colors.bright}📍 Application URL:${colors.reset} ${colors.fg.yellow}http://localhost:${port}${colors.reset}`);
  console.log(`${colors.fg.green}${colors.bright}📚 Swagger Docs:${colors.reset}    ${colors.fg.yellow}http://localhost:${port}/docs${colors.reset}`);
  console.log('='.repeat(60) + '\n');
}

bootstrap(); 