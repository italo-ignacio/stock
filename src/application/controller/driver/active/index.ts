import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfDriver } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { deleteSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const activeDriverController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await deleteSchema.validate(request, { abortEarly: false });
      const { id } = request.params;

      if (!(await accountIsOwnerOfDriver(id, request.account.id)))
        return unauthorized({ response });

      const search = await DataSource.driver.findFirst({
        select: {
          id: true
        },
        where: {
          id,
          isDisable: false
        }
      });

      if (search !== null)
        return badRequest({
          message: {
            english: 'Driver is already registered in the system',
            portuguese: 'Motorista já está cadastrado no sistema.'
          },
          response
        });

      await DataSource.driver.update({
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
