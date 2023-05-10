/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfVehicle, driverIsOwnerOfVehicle } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateVehicleSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  licensePlate?: string;
  type?: string;
  image?: string;
  autoApproveCost?: boolean;
  autoApproveWork?: boolean;
  driverList?: string[];
}

export const updateVehicleController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateVehicleSchema.validate(request, { abortEarly: false });

      const { name, image, type, licensePlate, autoApproveCost, autoApproveWork, driverList } =
        request.body as Body;

      const { id } = request.params;

      const isDriver =
        request.account.role === 'driver'
          ? await driverIsOwnerOfVehicle(id, request.account.id)
          : false;

      if (!(await accountIsOwnerOfVehicle(id, request.account.id)) && !isDriver)
        return unauthorized({ response });

      const vehicleDriver =
        driverList !== undefined && driverList.length >= 1
          ? {
              createMany: {
                data: driverList.map((driver) => ({
                  driverId: driver
                })),
                skipDuplicates: true
              }
            }
          : undefined;

      const data = isDriver
        ? { image, licensePlate, name, type }
        : { autoApproveCost, autoApproveWork, image, licensePlate, name, type, vehicleDriver };

      await DataSource.vehicle.update({
        data,
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
