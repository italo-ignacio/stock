import { join } from 'path';
import { static as staticExpress } from 'express';

export const staticRoute = '/static';
export const staticFolder = staticExpress(join(__dirname, '..', '..', '..', 'static'));
