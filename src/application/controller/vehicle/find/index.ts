/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findVehicleController: Controller =
  () => async (request: Request, response: Response) => {
    const searchParams =
      request.account.role === 'driver'
        ? {
            vehicleDriver: {
              every: {
                driverId: request.account.id
              }
            }
          }
        : {
            vehicleFleet: {
              accountId: request.account.id
            }
          };

    try {
      const search = await DataSource.vehicle.findMany({
        select: {
          costByYear: true,
          id: true,
          image: true,
          name: true,
          type: true,
          work: true
        },
        where: { ...searchParams }
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
