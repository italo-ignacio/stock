/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-undefined */

import type { Request } from 'express';

interface query {
  page?: number;
}
export const pagination = (
  request: Request
): {
  take: number;
  skip: number;
} => {
  const takeValue = 5;
  let skipValue = 0;
  const { page } = request.query as query;

  if (typeof page !== 'undefined' && Number(page) >= 1) skipValue = Number(page) * 5 - 5;

  return {
    skip: skipValue,
    take: takeValue
  };
};
