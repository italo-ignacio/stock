import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { env } from '@main/config';
import { hash } from 'bcrypt';
import { insertAccountSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  email: string;
  password: string;
}

export const insertAccountController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertAccountSchema.validate(request, { abortEarly: false });

      const { name, email, password } = request.body as Body;

      const hasAccount = await DataSource.account.findUnique({
        where: {
          email
        }
      });

      if (hasAccount !== null)
        return badRequest({ message: messages.account.emailAlreadyExists, response });

      const { hashSalt }: { hashSalt: number } = env;

      const hashedPassword = await hash(password, hashSalt);

      await DataSource.account.create({
        data: { email, name, password: hashedPassword }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
