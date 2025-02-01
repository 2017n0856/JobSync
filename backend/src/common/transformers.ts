import { Transform } from 'class-transformer';
import { institutes } from 'src/shared/constants';

export function NormalizeCountry() {
  return Transform(({ value }) => {
    console.log('here333', value);
    if (typeof value !== 'string') {
      return value;
    }
    return value.toUpperCase().replace(/\./g, '');
  });
}

export function NormalizePhoneNumber() {
    return Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.replace(/[\(\)\-\s]/g, '');
        }
        return value;
    });
}

export function NormalizeInstituteName() {
    return Transform(({ value }) => {
        if (institutes.includes(value.toUpperCase())) {
            return value.toUpperCase();
        } else {
            return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        }
    });
}
