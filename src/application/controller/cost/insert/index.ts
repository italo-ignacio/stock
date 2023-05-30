/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanCreateCost } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { insertCostSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  value: number;
  description?: string;
  image?: string;
  driverId?: string;
  date?: Date;
  vehicleId: string;
}

export const insertCostController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertCostSchema.validate(request, { abortEarly: false });

      const { name, value, description, image, driverId, vehicleId, date } = request.body as Body;

      if (!(await accountCanCreateCost(vehicleId, request.account.id)))
        return unauthorized({ response });

      await DataSource.cost.create({
        data: {
          date,
          description,
          driverId: driverId ?? request.account.id,
          image,
          name,
          value: Number(value),
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
