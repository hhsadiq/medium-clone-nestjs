import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export const NOT_FOUND = (
  entityName: string,
  attributes: Record<string, string | number>,
) => {
  const errors = Object.entries(attributes).reduce((acc, [key, value]) => {
    acc[key] = `${entityName} not found for ${key}: ${value}`;
    return acc;
  }, {});
  return new NotFoundException({
    statusCode: HttpStatus.NOT_FOUND,
    errors,
  });
};

export const BAD_REQUEST = (message: string) =>
  new BadRequestException(`${message}`);

export const INTERNAL_SERVER = (message: string) =>
  new InternalServerErrorException(`${message}`);

export const UNPROCESSABLE_ENTITY = (message: string, attribute: string) => {
  return new UnprocessableEntityException({
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      [attribute]: message,
    },
  });
};

export const UNAUTHORIZED = (message: string, attribute: string) => {
  return new UnprocessableEntityException({
    statusCode: HttpStatus.UNAUTHORIZED,
    errors: {
      [attribute]: message,
    },
  });
};

export const FORBIDDEN = (message: string, attribute: string) => {
  return new ForbiddenException({
    statusCode: HttpStatus.FORBIDDEN,
    errors: {
      [attribute]: message,
    },
  });
};

export const CustomException = (message: string, attribute: string) => {
  return new ConflictException({
    statusCode: HttpStatus.CONFLICT,
    errors: {
      [attribute]: message,
    },
  });
};
