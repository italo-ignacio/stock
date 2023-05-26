/* eslint-disable @typescript-eslint/no-magic-numbers */

import { existsSync, unlink } from 'fs';
import { imageFolder } from '@main/middleware';

export const removeImage = (url: string): void => {
  const image = url.split('/');
  const imagePath = imageFolder(image[image.length - 1]);

  if (existsSync(imagePath)) unlink(imagePath, () => true);
};
