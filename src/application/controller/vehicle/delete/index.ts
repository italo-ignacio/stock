import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfVehicle, removeImage } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { deleteSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const deleteVehicleController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await deleteSchema.validate(request, { abortEarly: false });

      const { id } = request.params;

      if (!(await accountIsOwnerOfVehicle(id, request.account.id)))
        return unauthorized({ response });

      const { image } = await DataSource.vehicle.delete({
        select: {
          image: true
        },
        where: { id }
      });

      if (image !== null) removeImage(image);

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
