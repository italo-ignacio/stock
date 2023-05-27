import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfVehicleFleet } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateVehicleFleetSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  autoApproveCost?: boolean;
}

export const updateVehicleFleetController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateVehicleFleetSchema.validate(request, { abortEarly: false });

      const { id } = request.params;

      if (!(await accountIsOwnerOfVehicleFleet(id, request.account.id)))
        return unauthorized({ response });

      const { name, autoApproveCost } = request.body as Body;

      await DataSource.vehicleFleet.update({
        data: { autoApproveCost, name },
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
