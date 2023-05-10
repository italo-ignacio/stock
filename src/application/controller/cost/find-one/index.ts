/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { badRequest, errorLogger, notFound, ok } from '@main/utils';
import { findOneSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneCostController: Controller =
  () => async (request: Request, response: Response) => {
    await findOneSchema.validate(request, { abortEarly: false });

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
      const search = await DataSource.cost.findFirst({
        select: {
          driver: {
            select: {
              name: true
            }
          },
          id: true,
          image: true,
          name: true,
          status: true,
          value: true
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
            english: 'Cost',
            portuguese: 'Custo'
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
