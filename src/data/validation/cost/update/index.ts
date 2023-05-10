import { numberNotRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateCostSchema = yup.object().shape({
  body: yup.object().shape({
    costByMonthId: stringNotRequired(),
    description: stringNotRequired(),
    image: stringNotRequired(),
    name: stringNotRequired(),
    value: numberNotRequired()
  }),
  params: yup.object().shape({
    id: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
