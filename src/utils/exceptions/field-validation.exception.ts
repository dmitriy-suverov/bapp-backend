import { ValidationException } from './validation.exception';
import { ValidationError } from 'class-validator';

export class FieldValidationException extends ValidationException {
  constructor(field, value, constraints) {
    const error = new ValidationError();
    error.property = field;
    error.children = [];
    error.value = value;
    error.constraints = constraints;
    super([error]);
  }
}
