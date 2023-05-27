/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanCreateCost, costIsPending } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { insertCostSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  costByMonthId: string;
  name: string;
  value: number;
  description?: string;
  image?: string;
  driverId?: string;
  vehicleId: string;
}

export const insertCostController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertCostSchema.validate(request, { abortEarly: false });

      const { costByMonthId, name, value, description, image, driverId, vehicleId } =
        request.body as Body;

      if (!(await accountCanCreateCost(costByMonthId, request.account.id)))
        return unauthorized({ response });

      const status = (await costIsPending(costByMonthId)) ? 'PENDING' : 'APPROVED';

      await DataSource.cost.create({
        data: {
          description,
          driverId: driverId ?? request.account.id,
          image,
          name,
          status,
          value,
          vehicleId
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
