/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-undefined */
/* eslint-disable no-ternary */
import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { arrayExists } from '@application/helpers';
import { badRequest, errorLogger, ok, validationErrorResponse } from '@main/utils';
import { insertDriverSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  email: string;
  fleetList?: string[];
}

export const insertDriverController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertDriverSchema.validate(request, { abortEarly: false });

      const { name, email, fleetList } = request.body as Body;

      const hasDriver = await DataSource.driver.findFirst({
        select: {
          id: true
        },
        where: {
          AND: {
            email,
            isDisable: false
          }
        }
      });

      if (hasDriver !== null)
        return badRequest({ message: messages.account.emailAlreadyExists, response });

      const fleetDriver =
        arrayExists(fleetList) && fleetList !== undefined
          ? fleetList.length > 1
            ? {
                createMany: {
                  data: fleetList.map((driver) => ({
                    fleetId: driver
                  })),
                  skipDuplicates: true
                }
              }
            : {
                create: {
                  fleetId: fleetList[0]
                }
              }
          : undefined;

      await DataSource.driver.create({
        data: {
          accountId: request.account.id,
          email,
          fleetDriver,
          name,
          password: 'password'
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
