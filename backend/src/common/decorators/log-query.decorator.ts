import { Logger } from '@nestjs/common';

export function LogQuery() {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const logger = new Logger(`${target.constructor.name}`);

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const methodName = propertyName;
      const className = target.constructor.name;
      
      logger.log(`[QUERY START] ${className}.${methodName} called with args: ${JSON.stringify(args)}`);
      
      try {
        const result = await method.apply(this, args);
        const executionTime = Date.now() - startTime;
        
        logger.log(`[QUERY SUCCESS] ${className}.${methodName} completed in ${executionTime}ms`);
        
        // Log result summary (without sensitive data)
        if (Array.isArray(result)) {
          logger.log(`[QUERY RESULT] ${className}.${methodName} returned ${result.length} items`);
        } else if (result && typeof result === 'object') {
          const keys = Object.keys(result);
          logger.log(`[QUERY RESULT] ${className}.${methodName} returned object with keys: ${keys.join(', ')}`);
        } else {
          logger.log(`[QUERY RESULT] ${className}.${methodName} returned: ${typeof result}`);
        }
        
        return result;
      } catch (error) {
        const executionTime = Date.now() - startTime;
        logger.error(`[QUERY ERROR] ${className}.${methodName} failed after ${executionTime}ms: ${error.message}`);
        throw error;
      }
    };
  };
} 