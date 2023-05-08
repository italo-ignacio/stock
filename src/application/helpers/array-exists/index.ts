/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-undefined */

export const arrayExists = (array: any[] | undefined): boolean => {
  if (array !== undefined && array.length >= 1) return true;
  return false;
};
