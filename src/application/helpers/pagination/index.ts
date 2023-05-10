/* eslint-disable no-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-undefined */

import type { Request } from 'express';

interface query {
  page?: number;
  limit?: number;
}
export const pagination = (
  request: Request
): {
  take: number;
  skip: number;
} => {
  let takeValue = 5;
  let skipValue = 0;
  const { page, limit } = request.query as query;

  if (typeof limit !== 'undefined' && Number(limit) >= 1)
    takeValue = limit >= takeValue ? limit : takeValue;

  if (takeValue > 30) takeValue = 30;

  if (typeof page !== 'undefined' && Number(page) >= 1)
    skipValue = Number(page) * takeValue - takeValue;

  return {
    skip: skipValue,
    take: takeValue
  };
};
