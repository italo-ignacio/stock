import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanDeleteCostByYear } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateCostByYearSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const deleteCostController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateCostByYearSchema.validate(request, { abortEarly: false });

      const { id } = request.params;

      if (!(await accountCanDeleteCostByYear(id, request.account.id)))
        return unauthorized({ response });

      await DataSource.costByYear.delete({
        where: { id }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
