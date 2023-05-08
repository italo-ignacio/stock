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

export const authenticateAccountController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await authenticateSchema.validate(request, { abortEarly: false });

      const { email, password } = request.body as Body;

      const account = await DataSource.account.findUnique({
        where: { email }
      });

      if (account === null)
        return unauthorized({
          message: messages.auth.notFound,
          response
        });

      const passwordIsCorrect = await compare(password, account.password);

      if (!passwordIsCorrect)
        return unauthorized({
          message: messages.auth.notFound,
          response
        });

      const { accessToken } = generateToken({
        email: account.email,
        id: account.id,
        name: account.name,
        role: 'account'
      });

      const refreshTokenHalfSize = 64;
      const refreshToken = randomBytes(refreshTokenHalfSize).toString('hex');
      const refreshTokenExpiresAt = add(new Date(), { months: env.refreshTokenExpires });

      await DataSource.account.update({
        data: {
          refreshToken,
          refreshTokenExpiresAt
        },
        where: {
          id: account.id
        }
      });

      return ok({ payload: { accessToken, refreshToken }, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return badRequest({ response });
    }
  };
