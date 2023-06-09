/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { insertClientSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  cnpj: string;
  locations: string;
}

export const insertClientController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertClientSchema.validate(request, { abortEarly: false });

      const { name, cnpj, locations } = request.body as Body;

      await DataSource.client.create({
        data: {
          accountId: request.account.id,
          cnpj,
          locations,
          name
        },
        select: {
          id: true
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
