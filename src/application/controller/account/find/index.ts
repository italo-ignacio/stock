import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findAccountController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const search = await DataSource.account.findUnique({
        select: {
          email: true,
          id: true,
          name: true,
          plan: true,
          vehicleFleet: true
        },
        where: {
          id: request.account.id
        }
      });

      if (search === null) return badRequest({ response });

      return ok({
        payload: search,
        response
      });
    } catch (error) {
      errorLogger(error);

      return badRequest({ response });
    }
  };
