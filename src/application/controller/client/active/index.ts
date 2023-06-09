import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfClient } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { deleteSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const activeClientController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await deleteSchema.validate(request, { abortEarly: false });
      const { id } = request.params;

      if (!(await accountIsOwnerOfClient(id, request.account.id)))
        return unauthorized({ response });

      await DataSource.client.update({
        data: {
          isDisable: false
        },
        select: {
          id: true
        },
        where: {
          id
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ message: messages.auth.notFound, response });
    }
  };
