/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { accountIsOwnerOfWork } from '@application/helpers';
import { badRequest, errorLogger, notFound, ok, unauthorized } from '@main/utils';
import { findOneSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneCostByYearController: Controller =
  () => async (request: Request, response: Response) => {
    await findOneSchema.validate(request, { abortEarly: false });

    const { id } = request.params;

    if (!(await accountIsOwnerOfWork(id, request.account.id, request.account.id)))
      return unauthorized({ response });

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
      const search = await DataSource.work.findFirst({
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
            english: 'Work',
            portuguese: 'Trabalho'
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
