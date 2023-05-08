/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfVehicleFleet, arrayExists } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { insertVehicleSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  licensePlate: string;
  type: string;
  vehicleFleetId: string;
  image?: string;
  autoApproveCost?: boolean;
  autoApproveWork?: boolean;
  driverList?: string[];
}

export const insertVehicleController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertVehicleSchema.validate(request, { abortEarly: false });

      const {
        name,
        image,
        type,
        vehicleFleetId,
        licensePlate,
        autoApproveCost,
        autoApproveWork,
        driverList
      } = request.body as Body;

      if (!(await accountIsOwnerOfVehicleFleet(vehicleFleetId, request.account.id)))
        return unauthorized({ response });

      const vehicleDriver = arrayExists(driverList)
        ? {
            createMany: {
              data:
                driverList?.map((driver) => ({
                  driverId: driver
                })) ?? [],
              skipDuplicates: true
            }
          }
        : undefined;

      await DataSource.vehicle.create({
        data: {
          autoApproveCost,
          autoApproveWork,
          image,
          licensePlate,
          name,
          type,
          vehicleDriver,
          vehicleFleetId
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
