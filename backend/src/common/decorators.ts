import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export function IsValidCountry(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCountry',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return countries.isValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid country`;
        }
      }
    });
  };
}
