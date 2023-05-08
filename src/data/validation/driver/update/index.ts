import { emailNotRequired, stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateDriverSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailNotRequired(),
    name: stringNotRequired()
  })
});
