import { registerDecorator, ValidationOptions } from 'class-validator';
import * as countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries';

countries.registerLocale(en as any);

export function IsValidCountry(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCountry',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return countries.isValid(value);
        },
        defaultMessage() {
          return `Invalid country`;
        },
      },
    });
  };
}
