import { stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const findOneSchema = yup.object().shape({
  params: yup.object().shape({
    id: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
