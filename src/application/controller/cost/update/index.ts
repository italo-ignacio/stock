import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountOwnerCost } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateCostSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  value?: number;
  description?: string;
  image?: string;
  driverId?: string;
  status?: 'APPROVED' | 'PENDING';
}

export const updateCostController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateCostSchema.validate(request, { abortEarly: false });
      const { id } = request.params;
      const { name, value, description, image, driverId, status } = request.body as Body;

      if (!(await accountOwnerCost(id, request.account.id))) return unauthorized({ response });

      await DataSource.cost.update({
        data: {
          description,
          driverId,
          image,
          name,
          status,
          value
        },
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
