import { DataSource } from '@infra/database';
import { badRequest, errorLogger, notFound, ok } from '@main/utils';
import { findOneSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneVehicleFleetController: Controller =
  () => async (request: Request, response: Response) => {
    await findOneSchema.validate(request, { abortEarly: false });

    try {
      const search = await DataSource.vehicleFleet.findFirst({
        select: {
          id: true,
          name: true,
          vehicle: true
        },
        where: {
          AND: {
            accountId: request.account.id,
            id: request.params.id
          }
        }
      });

      if (search === null)
        return notFound({
          field: {
            english: 'Vehicle control',
            portuguese: 'Controle de veículo'
          },
          response
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
