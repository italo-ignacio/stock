import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import { pagination } from '@application/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findVehicleFleetController: Controller =
  () => async (request: Request, response: Response) => {
    const { skip, take } = pagination(request);

    try {
      const search = await DataSource.vehicleFleet.findMany({
        select: {
          accountId: true,
          id: true,
          name: true,
          vehicle: true
        },
        skip,
        take,
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
