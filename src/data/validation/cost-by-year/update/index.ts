/* eslint-disable @typescript-eslint/no-magic-numbers */
import { stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateCostByYearSchema = yup.object().shape({
  body: yup.object().shape({
    year: stringRequired({
      english: 'year',
      portuguese: 'ano'
    })
      .min(4)
      .max(4)
  }),
  params: yup.object().shape({
    id: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
