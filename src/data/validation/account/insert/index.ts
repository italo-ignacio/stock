import { emailRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertAccountSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailRequired({
      english: 'email',
      portuguese: 'e-mail'
    }),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    }),
    password: stringRequired({
      english: 'password',
      portuguese: 'senha'
    })
  })
});
