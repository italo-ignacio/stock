import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { messages } from '@domain/helpers';
import { updateAccountSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  email?: string;
}

export const updateAccountController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateAccountSchema.validate(request, { abortEarly: false });

      const { name, email } = request.body as Body;

      if (typeof email !== 'undefined') {
        const hasAccount = await DataSource.account.findUnique({
          select: {
            id: true
          },
          where: {
            email
          }
        });

        if (hasAccount !== null)
          return badRequest({ message: messages.account.emailAlreadyExists, response });
      }

      await DataSource.account.update({
        data: { email, name },
        select: {
          id: true
        },
        where: {
          id: request.account.id
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
