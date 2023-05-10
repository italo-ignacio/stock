/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanCreateWork } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { insertWorkSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  destiny: string;
  distance: number;
  match: string;
  vehicleId: string;
  driverId?: string;
}

export const insertWorkController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertWorkSchema.validate(request, { abortEarly: false });

      const { destiny, distance, match, vehicleId, driverId } = request.body as Body;

      if (!(await accountCanCreateWork(vehicleId, request.account.id)))
        return unauthorized({ response });

      await DataSource.work.create({
        data: {
          destiny,
          distance,
          driverId: driverId ?? request.account.id,
          match,
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
