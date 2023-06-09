import { DataSource } from '@infra/database';
import { badRequest, errorLogger, ok } from '@main/utils';
import { pagination } from '@application/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findClientController: Controller =
  () => async (request: Request, response: Response) => {
    const { skip, take } = pagination(request);

    try {
      const search = await DataSource.client.findMany({
        select: {
          id: true,
          name: true
        },
        skip,
        take,
        where: {
          AND: {
            accountId: request.account.id
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
