/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import { pagination } from '@application/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findCostByYearController: Controller =
  () => async (request: Request, response: Response) => {
    const { skip, take } = pagination(request);

    const searchParams =
      request.account.role === 'driver'
        ? {
            driverId: request.account.id
          }
        : {
            driver: {
              accountId: request.account.id
            }
          };

    try {
      const search = await DataSource.work.findMany({
        select: {
          destiny: true,
          distance: true,
          driver: {
            select: {
              name: true
            }
          },
          match: true,
          status: true
        },
        skip,
        take,
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
