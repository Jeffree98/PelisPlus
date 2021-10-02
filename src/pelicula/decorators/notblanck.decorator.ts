import { registerDecorator, ValidationOptions, ValidationArguments, ValidationError } from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
             if(typeof value !== 'string') return false;
             const valueTRim = value.replace(/ /g, '');
             if(valueTRim === '') return false;
             return true;
        },
      },
    });
  };
}