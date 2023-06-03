import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { add } from 'date-fns';
import { authenticateSchema } from '@data/validation';
import {
  badRequest,
  errorLogger,
  generateToken,
  ok,
  unauthorized,
  validationErrorResponse
} from '@main/utils';
import { compare } from 'bcrypt';
import { env } from '@main/config';
import { messages } from '@domain/helpers';
import { randomBytes } from 'crypto';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  email: string;
  password: string;
}

export const authenticateDriverController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await authenticateSchema.validate(request, { abortEarly: false });

      const { email, password } = request.body as Body;

      const driver = await DataSource.driver.findFirst({
        select: {
          email: true,
          id: true,
          name: true,
          password: true
        },
        where: {
          AND: {
            email,
            isDisable: false
          }
        }
      });

      if (driver === null)
        return unauthorized({
          message: messages.auth.notFound,
          response
        });

      const passwordIsCorrect = await compare(password, driver.password);

      if (!passwordIsCorrect)
        return unauthorized({
          message: messages.auth.notFound,
          response
        });

      const { accessToken } = generateToken({
        email: driver.email,
        id: driver.id,
        name: driver.name,
        role: 'driver'
      });

      const refreshTokenHalfSize = 64;
      const refreshToken = randomBytes(refreshTokenHalfSize).toString('hex');
      const refreshTokenExpiresAt = add(new Date(), { months: env.refreshTokenExpires });

      await DataSource.driver.update({
        data: {
          refreshToken,
          refreshTokenExpiresAt
        },
        select: {
          id: true
        },
        where: {
          id: driver.id
        }
      });

      return ok({
        payload: {
          accessToken,
          refreshToken,
          user: {
            email: driver.id,
            id: driver.id,
            name: driver.id,
            role: 'driver'
          }
        },
        response
      });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
