import { stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const refreshSchema = yup.object().shape({
  body: yup.object().shape({
    refreshToken: stringRequired({
      english: 'refresh token',
      portuguese: 'token'
    })
  })
});
