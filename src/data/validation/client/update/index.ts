import { stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateClientSchema = yup.object().shape({
  body: yup.object().shape({
    cnpj: stringNotRequired(),
    locations: stringNotRequired(),
    name: stringNotRequired()
  })
});
