import type { messageTypeResponse } from '@domain/errors';

export const defaultMessages = {
  badRequest: {
    english: 'Request failed',
    portuguese: 'Falha na requisição'
  },
  notFound: (field: messageTypeResponse): messageTypeResponse => ({
    english: `${field.english} not found`,
    portuguese: `${field.portuguese} não encontrado`
  }),
  ok: {
    english: 'Request successfully',
    portuguese: 'Requisição bem sucedida'
  },
  timeout: {
    english: 'Request has expired. Try again later',
    portuguese: 'Solicitação expirou. Tente novamente mais tarde'
  },
  unauthorized: {
    english: 'Unauthenticated user',
    portuguese: 'Usuário não autenticado'
  },
  uploadError: {
    english: 'Error during file upload',
    portuguese: 'Erro durante o upload do arquivo'
  },
  validationErrorResponse: {
    english: 'Failed during form validation',
    portuguese: 'Falha durante validação do formulário'
  }
};
