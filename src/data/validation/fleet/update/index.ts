import { stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateFleetSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired()
  }),
  params: yup.object().shape({
    id: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
