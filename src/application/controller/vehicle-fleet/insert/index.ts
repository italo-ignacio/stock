import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { insertVehicleFleetSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  autoApproveCost?: boolean;
}

export const insertVehicleFleetController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertVehicleFleetSchema.validate(request, { abortEarly: false });

      const { name, autoApproveCost } = request.body as Body;

      await DataSource.vehicleFleet.create({
        data: {
          accountId: request.account.id,
          autoApproveCost,
          name
        },
        select: {
          id: true
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
