/* eslint-disable @typescript-eslint/no-magic-numbers */
import { stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertCostByYearSchema = yup.object().shape({
  body: yup.object().shape({
    vehicleId: stringRequired({
      english: 'id',
      portuguese: 'id'
    }),
    year: stringRequired({
      english: 'year',
      portuguese: 'ano'
    })
      .min(4)
      .max(4)
  })
});
