import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findVehicleFleetController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const search = await DataSource.vehicleFleet.findMany({
        select: {
          accountId: true,
          id: true,
          name: true,
          vehicle: true
        },
        where: {
          accountId: request.account.id
        }
      });

      return ok({
        payload: search,
        response
      });
    } catch (error) {
      errorLogger(error);

      return badRequest({ response });
    }
  };
