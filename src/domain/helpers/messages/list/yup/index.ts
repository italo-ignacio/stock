import type { messageTypeResponse } from '@domain/errors';

export const yupMessages = {
  dateSchema: (value: messageTypeResponse): messageTypeResponse => ({
    english: `The field ${value.english} must be a date`,
    portuguese: `O campo ${value.portuguese} deve ser uma data`
  }),

  emailSchema: {
    english: 'Invalid email',
    portuguese: 'E-mail inválido'
  },

  numberSchema: (value: messageTypeResponse): messageTypeResponse => ({
    english: `The field ${value.english} must be a number`,
    portuguese: `O campo ${value.portuguese} deve ser uma número`
  }),

  requiredSchema: (value: messageTypeResponse): messageTypeResponse => ({
    english: `The field ${value.english} is required`,
    portuguese: `O campo ${value.portuguese} é obrigatório`
  })
};
