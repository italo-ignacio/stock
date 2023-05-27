import type { messageTypeResponse } from '@domain/errors';

export const yupMessages = {
  dateSchema: {
    english: 'Invalid date',
    portuguese: 'Data inválida'
  },

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
