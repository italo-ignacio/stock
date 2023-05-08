export const api = {
  baseUrl: '/api/v1'
};

export enum statusCodeList {
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
  NOT_AUTHORIZED = 401,
  NOT_FOUND = 404,
  OK = 200,
  TIMEOUT = 408
}
