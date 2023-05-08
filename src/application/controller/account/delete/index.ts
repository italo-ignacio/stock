import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const deleteAccountController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await DataSource.account.delete({
        select: {
          email: true,
          name: true
        },
        where: {
          id: request.account.id
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ message: messages.auth.notFound, response });
    }
  };
