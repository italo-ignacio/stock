import { DataSource } from '@infra/database';
import { env } from '@main/config/env';
import { errorLogger, removeBearer, unauthorized } from '@main/utils';
import { verify } from 'jsonwebtoken';
import type { Controller } from '@application/protocols';
import type { NextFunction, Request, Response } from 'express';
import type { tokenInput } from '@domain/token';

export const validateTokenMiddleware: Controller =
  // eslint-disable-next-line consistent-return
  () => async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      if (typeof authorization === 'undefined') return unauthorized({ response });

      const accessToken = removeBearer(authorization);

      if (accessToken === null) return unauthorized({ response });

      const { jwtSecret } = env;
      const { id, name, email } = verify(accessToken, jwtSecret) as tokenInput;

      if (typeof id === 'undefined' || typeof email === 'undefined' || typeof name === 'undefined')
        return unauthorized({ response });

      const account = await DataSource.account.findFirst({
        where: {
          email,
          id
        }
      });

      if (account === null) return unauthorized({ response });

      Object.assign(request, { account: { email, id, name, role: 'account' } });
      next();
    } catch (error) {
      errorLogger(error);

      return unauthorized({ response });
    }
  };
