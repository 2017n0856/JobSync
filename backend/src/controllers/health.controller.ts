import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
        uptime: { type: 'number', example: 123.456 }
      }
    }
  })
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  }

  @Get('graphql-info')
  @ApiOperation({ summary: 'GraphQL endpoint information' })
  @ApiResponse({ 
    status: 200, 
    description: 'GraphQL playground and endpoint information',
    schema: {
      type: 'object',
      properties: {
        playground: { type: 'string', example: 'http://localhost:3000/graphql' },
        introspection: { type: 'boolean', example: true },
        available: { type: 'boolean', example: true }
      }
    }
  })
  getGraphQLInfo() {
    return {
      playground: `http://localhost:${process.env.PORT || 3000}/graphql`,
      introspection: true,
      available: true
    };
  }
} 