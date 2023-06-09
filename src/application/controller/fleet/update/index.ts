import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfFleet } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateFleetSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
}

export const updateFleetController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateFleetSchema.validate(request, { abortEarly: false });

      const { id } = request.params;

      if (!(await accountIsOwnerOfFleet(id, request.account.id))) return unauthorized({ response });

      const { name } = request.body as Body;

      await DataSource.fleet.update({
        data: { name },
        select: {
          id: true
        },
        where: {
          id: request.params.id
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
