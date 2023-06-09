import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { accountIsOwnerOfClient } from '@application/helpers';
import { badRequest, errorLogger, ok, unauthorized, validationErrorResponse } from '@main/utils';
import { updateClientSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  cnpj?: string;
  locations?: string;
}

export const updateClientController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateClientSchema.validate(request, { abortEarly: false });
      const { id } = request.params;

      if (!(await accountIsOwnerOfClient(id, request.account.id)))
        return unauthorized({ response });

      const { name, cnpj, locations } = request.body as Body;

      await DataSource.client.update({
        data: { cnpj, locations, name },
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
