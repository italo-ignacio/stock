/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, notFound, ok } from '@main/utils';
import { findOneSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneVehicleController: Controller =
  () => async (request: Request, response: Response) => {
    await findOneSchema.validate(request, { abortEarly: false });

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
            fleet: {
              accountId: request.account.id
            }
          };

    try {
      const search = await DataSource.vehicle.findFirst({
        select: {
          cost: true,
          id: true,
          image: true,
          name: true,
          type: true,
          work: true
        },
        where: {
          AND: {
            id: request.params.id,
            ...searchParams
          }
        }
      });

      if (search === null)
        return notFound({
          field: {
            english: 'Vehicle',
            portuguese: 'Veículo'
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
