import { numberNotRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateWorkSchema = yup.object().shape({
  body: yup.object().shape({
    destiny: stringNotRequired(),
    distance: numberNotRequired(),
    match: stringNotRequired()
  }),
  params: yup.object().shape({
    id: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
