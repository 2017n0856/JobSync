import { registerDecorator, ValidationOptions } from 'class-validator';

// Simple country validation without external dependencies
const validCountries = [
  'US',
  'CANADA',
  'UK',
  'AUSTRALIA',
  'KUWAIT',
  'PAKISTAN',
  'INDIA',
  'CHINA',
  'JAPAN',
  'GERMANY',
  'FRANCE',
  'ITALY',
  'SPAIN',
  'BRAZIL',
  'MEXICO',
  'ARGENTINA',
  'SOUTH AFRICA',
  'EGYPT',
  'NIGERIA',
  'KENYA',
];

export function IsValidCountry(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCountry',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value || typeof value !== 'string') {
            return false;
          }
          return validCountries.includes(value.toUpperCase());
        },
        defaultMessage() {
          return `Invalid country. Must be one of: ${validCountries.join(', ')}`;
        },
      },
    });
  };
}
