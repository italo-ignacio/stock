import { numberRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertCostSchema = yup.object().shape({
  body: yup.object().shape({
    costByMonthId: stringRequired({
      english: 'id',
      portuguese: 'id'
    }),
    description: stringNotRequired(),
    driverId: stringNotRequired(),
    image: stringNotRequired(),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    }),
    value: numberRequired({
      english: 'value',
      portuguese: 'valor'
    })
  })
});
