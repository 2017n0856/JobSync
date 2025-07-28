import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Country } from '../enums/country.enum';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
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
            [Country.US]: /^\+1\d{10}$/,
            [Country.PAK]: /^\+92\d{10}$/,
            [Country.INDIA]: /^\+91\d{10}$/,
            [Country.AUS]: /^\+61\d{9}$/,
            [Country.CANADA]: /^\+1\d{10}$/,
            [Country.UK]: /^\+44\d{10}$/,
            [Country.POLAND]: /^\+48\d{9}$/,
            [Country.KUWAIT]: /^\+965\d{8}$/,
            [Country.SAUDIA]: /^\+966\d{9}$/,
            [Country.DUBAI]: /^\+971\d{9}$/,
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