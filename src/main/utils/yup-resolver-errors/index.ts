/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ValidationError } from 'yup';

export interface PrettyYupError {
  message: string;
  param: string | undefined;
}

export const formatYupError = (error: ValidationError): PrettyYupError[] =>
  error.inner.map((item) => ({
    message: JSON.parse(item.message),
    param: item.path
  }));
