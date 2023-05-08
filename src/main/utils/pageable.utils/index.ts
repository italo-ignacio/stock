import type { Request } from 'express';

interface GetPageAndLimitInput {
  request: Request;
}

interface GetPageAndLimitOutput {
  skip: number;

  take: number;
}

export const getPageAndLimit = ({ request }: GetPageAndLimitInput): GetPageAndLimitOutput => {
  const page = Number(request.query.page);
  const limit = Number(request.query.limit);
  const subtractPage = 1;

  const skip = (page - subtractPage) * limit;
  const take = limit;

  return { skip, take };
};
