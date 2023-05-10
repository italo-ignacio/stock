import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfDriver } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { messages } from '@domain/helpers';
import { updateAccountSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  email?: string;
  driverId?: string;
  vehicleFleetList?: string[];
}

export const updateDriverController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateAccountSchema.validate(request, { abortEarly: false });
      const { id } = request.params;

      if (!(await accountIsOwnerOfDriver(id, request.account.id)) && id !== request.account.id)
        return unauthorized({ response });

      const { name, email } = request.body as Body;

      if (typeof email !== 'undefined') {
        const hasAccount = await DataSource.account.findUnique({
          where: {
            email
          }
        });

        if (hasAccount !== null)
          return badRequest({ message: messages.account.emailAlreadyExists, response });
      }

      await DataSource.account.update({
        data: { email, name },
        where: {
          id
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
