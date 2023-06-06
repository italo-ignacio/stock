/* eslint-disable max-statements */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import {
  badRequest,
  errorLogger,
  generateToken,
  ok,
  unauthorized,
  validationErrorResponse
} from '@main/utils';
import { messages } from '@domain/helpers';
import { refreshSchema } from '@data/validation';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  refreshToken: string;
}

export const refreshTokenController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await refreshSchema.validate(request, { abortEarly: false });

      const { refreshToken } = request.body as Body;

      const account = await DataSource.account.findFirst({
        select: {
          email: true,
          id: true,
          name: true,
          refreshTokenExpiresAt: true
        },
        where: {
          refreshToken
        }
      });

      if (account !== null)
        if (account.refreshTokenExpiresAt !== null && account.refreshTokenExpiresAt <= new Date()) {
          const { accessToken } = generateToken({
            email: account.email,
            id: account.id,
            name: account.name,
            role: 'account'
          });

          return ok({ payload: { accessToken }, response });
        }

      const driver = await DataSource.driver.findFirst({
        select: {
          email: true,
          id: true,
          name: true,

          refreshTokenExpiresAt: true
        },
        where: {
          refreshToken
        }
      });

      if (driver !== null)
        if (driver.refreshTokenExpiresAt !== null && driver.refreshTokenExpiresAt <= new Date()) {
          const { accessToken } = generateToken({
            email: driver.email,
            id: driver.id,
            name: driver.name,
            role: 'driver'
          });

          return ok({ payload: { accessToken }, response });
        }

      return unauthorized({
        message: messages.auth.notFound,
        response
      });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
