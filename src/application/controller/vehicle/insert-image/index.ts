import { ValidationError } from 'yup';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const insertVehicleImageController: Controller =
  () => (request: Request, response: Response) => {
    try {
      return ok({
        payload: {
          filename: request.file?.filename
        },
        response
      });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
