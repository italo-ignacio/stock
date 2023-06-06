import { arrayNotRequired, emailRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertDriverSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailRequired({
      english: 'email',
      portuguese: 'e-mail'
    }),
    fleetList: arrayNotRequired(
      stringRequired({
        english: 'id',
        portuguese: 'id'
      })
    ),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    })
  })
});
