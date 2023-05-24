import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import { pagination } from '@application/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findDriverController: Controller =
  () => async (request: Request, response: Response) => {
    const { skip, take } = pagination(request);

    try {
      const search = await DataSource.driver.findMany({
        select: {
          email: true,
          id: true,
          name: true,
          vehicleDriver: true
        },
        skip,
        take,
        where: {
          AND: {
            accountId: request.account.id,
            isDisable: false
          }
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
