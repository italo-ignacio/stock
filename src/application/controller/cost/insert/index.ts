/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanCreateCost, driverCanCreateCost } from '@application/helpers';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { insertCostSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  value: number;
  vehicleId: string;

  date?: string;
  description?: string;
  image?: string;
  driverId?: string;
}

export const insertCostController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertCostSchema.validate(request, { abortEarly: false });

      const { name, value, description, driverId, image, vehicleId, date } = request.body as Body;

      if (driverId === 'undefined' && request.account.role === 'account')
        return badRequest({ message: messages.cost.driverRequired, response });

      if (request.account.role === 'account') {
        if (!(await accountCanCreateCost(vehicleId, request.account.id)))
          return badRequest({
            message: messages.auth.notPermission({
              english: 'create a cost',
              portuguese: 'criar um custo'
            }),
            response
          });
      } else if (!(await driverCanCreateCost(vehicleId, request.account.id)))
        return badRequest({
          message: messages.auth.notPermission({
            english: 'create a cost',
            portuguese: 'criar um custo'
          }),
          response
        });

      await DataSource.cost.create({
        data: {
          date: typeof date === 'string' ? new Date(date) : new Date(),
          description,
          driverId: driverId ?? request.account.id,
          image,
          name,
          value: Number(value),
          vehicleId
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
