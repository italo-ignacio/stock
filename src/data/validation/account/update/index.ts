import { emailNotRequired, stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateAccountSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailNotRequired(),
    name: stringNotRequired(),
    startLocations: stringNotRequired()
  })
});
