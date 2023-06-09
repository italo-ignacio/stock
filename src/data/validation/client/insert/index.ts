import { arrayNotRequired, locationSchema, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertClientSchema = yup.object().shape({
  body: yup.object().shape({
    cnpj: stringNotRequired(),
    locations: arrayNotRequired(locationSchema()),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    })
  })
});
