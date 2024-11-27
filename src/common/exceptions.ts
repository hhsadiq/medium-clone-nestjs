import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

export const NOT_FOUND = (
  entityName: string,
  attributes: Record<string, string | number>,
  stack?: Error,
) => {
  const errors = Object.entries(attributes).reduce((acc, [key, value]) => {
    acc[key] = `${entityName} not found for ${key}: ${value}`;
    return acc;
  }, {});
  return new NotFoundException({
    statusCode: HttpStatus.NOT_FOUND,
    errors,
    stack: stack || 'No stack trace available',
  });
};

export const BAD_REQUEST = (message: string, stack?: Error) =>
  new BadRequestException({
    message,
    stack: stack || 'No stack trace available',
  });

export const INTERNAL_SERVER = (message: string, stack?: Error) =>
  new InternalServerErrorException({
    message,
    stack,
  });

export const UNPROCESSABLE_ENTITY = (
  message: string,
  attribute: string,
  stack?: Error,
) => {
  return new UnprocessableEntityException({
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      [attribute]: message,
    },
    stack: stack || 'No stack trace available',
  });
};

export const UNAUTHORIZED = (
  message: string,
  attribute: string,
  stack?: Error,
) => {
  return new UnauthorizedException({
    statusCode: HttpStatus.UNAUTHORIZED,
    errors: {
      [attribute]: message,
    },
    stack: stack || 'No stack trace available',
  });
};

export const FORBIDDEN = (
  message: string,
  attribute: string,
  stack?: Error,
) => {
  return new ForbiddenException({
    statusCode: HttpStatus.FORBIDDEN,
    errors: {
      [attribute]: message,
    },
    stack: stack || 'No stack trace available',
  });
};

export const CustomException = (
  message: string,
  attribute: string,
  stack?: Error,
) => {
  return new ConflictException({
    statusCode: HttpStatus.CONFLICT,
    errors: {
      [attribute]: message,
    },
    stack: stack || 'No stack trace available',
  });
};
