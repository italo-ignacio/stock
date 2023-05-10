import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanDeleteCostByYear } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateCostByYearSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  year: string;
  vehicleId: string;
}

export const updateCostByYearController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateCostByYearSchema.validate(request, { abortEarly: false });

      const { year } = request.body as Body;

      const { id } = request.params;

      if (!(await accountCanDeleteCostByYear(id, request.account.id)))
        return unauthorized({ response });

      await DataSource.costByYear.update({
        data: {
          year
        },
        where: { id }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
