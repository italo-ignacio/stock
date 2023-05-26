import { ValidationError } from 'yup';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { env } from '@main/config';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const insertVehicleImageController: Controller =
  () => (request: Request, response: Response) => {
    try {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (request.file?.filename) {
        const filename = `${request.protocol}://${request.get('host') ?? ''}/static/uploads/${
          env.staticPaths.images
        }/${request.file.filename}`;

        return ok({
          payload: {
            filename
          },
          response
        });
      }
      return badRequest({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
