/* eslint-disable no-bitwise */
/* eslint-disable id-length */
/* eslint-disable eqeqeq */
/* eslint-disable no-ternary */
/* eslint-disable @typescript-eslint/no-magic-numbers */

export const uuid = (): string => {
  let dt = new Date().getTime();
  const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, (c): string => {
    const r = (dt + Math.random() * 16) % 16 | 0;

    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

  return id;
};
