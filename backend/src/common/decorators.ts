import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { validCountries } from 'src/shared/constants';

export function IsValidCountry(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCountry',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return validCountries.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} is not in valid countries list`;
        }
      }
    });
  };
}
