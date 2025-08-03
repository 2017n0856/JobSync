import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { Country } from '../enums/country.enum';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;

          const country = (args.object as any).country;
          if (!country) return false;

          const phonePatterns = {
            [Country.UNITED_STATES]: /^\+1\d{10}$/,
            [Country.PAKISTAN]: /^\+92\d{10}$/,
            [Country.INDIA]: /^\+91\d{10}$/,
            [Country.AUSTRALIA]: /^\+61\d{9}$/,
            [Country.CANADA]: /^\+1\d{10}$/,
            [Country.UNITED_KINGDOM]: /^\+44\d{10}$/,
            [Country.POLAND]: /^\+48\d{9}$/,
            [Country.KUWAIT]: /^\+965\d{8}$/,
            [Country.SAUDI_ARABIA]: /^\+966\d{9}$/,
            [Country.UNITED_ARAB_EMIRATES]: /^\+971\d{9}$/,
            [Country.KENYA]: /^\+254\d{9}$/,
            [Country.QATAR]: /^\+974\d{8}$/,
          };

          const pattern = phonePatterns[country];
          return pattern ? pattern.test(value) : false;
        },
        defaultMessage(args: ValidationArguments) {
          const country = (args.object as any).country;
          return `Phone number must be valid for ${country}`;
        },
      },
    });
  };
}
