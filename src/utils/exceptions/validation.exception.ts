import { HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(data) {
    const response = {
      message: 'Validation error',
      data,
    };
    super(response, 400);
  }
}
