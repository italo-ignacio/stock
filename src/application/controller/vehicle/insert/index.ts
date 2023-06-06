/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfFleet } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { insertVehicleSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  licensePlate: string;
  type: string;
  fleetId: string;
  image?: string;
  driverList?: string;
}

export const insertVehicleController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertVehicleSchema.validate(request, { abortEarly: false });
      const { name, image, type, fleetId, licensePlate, driverList } = request.body as Body;

      if (!(await accountIsOwnerOfFleet(fleetId, request.account.id)))
        return unauthorized({ response });

      const driverArray = typeof driverList === 'string' ? driverList.split(',') : null;

      const vehicleDriver =
        driverArray === null
          ? undefined
          : {
              createMany: {
                data: driverArray.map((driver) => ({
                  driverId: driver
                })),
                skipDuplicates: true
              }
            };

      await DataSource.vehicle.create({
        data: {
          fleetId,
          image,
          licensePlate,
          name,
          type,
          vehicleDriver
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
