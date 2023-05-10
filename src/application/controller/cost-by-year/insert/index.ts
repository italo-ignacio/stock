/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanCreateCostByYear } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { insertCostByYearSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  year: string;
  vehicleId: string;
}

export const insertCostByYearController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertCostByYearSchema.validate(request, { abortEarly: false });

      const { year, vehicleId } = request.body as Body;

      if (!(await accountCanCreateCostByYear(vehicleId, request.account.id)))
        return unauthorized({ response });

      const search = await DataSource.costByYear.findFirst({
        where: {
          AND: {
            vehicleId,
            year
          }
        }
      });

      if (search !== null)
        return badRequest({
          message: {
            english: 'this year already exists',
            portuguese: 'esse ano já existe'
          },
          response
        });

      await DataSource.costByYear.create({
        data: {
          costByMonth: {
            createMany: {
              data: [
                {
                  month: 'JANUARY'
                },
                {
                  month: 'FEBRUARY'
                },
                {
                  month: 'MARCH'
                },
                {
                  month: 'APRIL'
                },
                {
                  month: 'MAY'
                },
                {
                  month: 'JUNE'
                },
                {
                  month: 'JULY'
                },
                {
                  month: 'AUGUST'
                },
                {
                  month: 'SEPTEMBER'
                },
                {
                  month: 'OCTOBER'
                },
                {
                  month: 'NOVEMBER'
                },
                {
                  month: 'DECEMBER'
                }
              ]
            }
          },
          vehicleId,
          year
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
