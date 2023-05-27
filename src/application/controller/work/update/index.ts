/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountCanUpdateWork } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateWorkSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  destiny?: string;
  distance?: number;
  match?: string;
  driverId?: string;
}

export const updateWorkController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateWorkSchema.validate(request, { abortEarly: false });

      const { destiny, distance, match, driverId } = request.body as Body;

      const { id } = request.params;

      if (!(await accountCanUpdateWork(id, request.account.id))) return unauthorized({ response });

      await DataSource.work.update({
        data: {
          destiny,
          distance,
          driverId: driverId ?? request.account.id,
          match
        },
        select: {
          id: true
        },
        where: {
          id
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
