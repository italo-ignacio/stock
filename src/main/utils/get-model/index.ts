/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from '@domain/helpers';
import type { models } from '@domain/model';

export const getModel = (url: any): { model: models; id?: string } => {
  const reqModel = url.toString().replace(`${api.baseUrl}/`, '');
  const [model, id] = reqModel.split('/');

  return {
    id,
    model
  };
};
