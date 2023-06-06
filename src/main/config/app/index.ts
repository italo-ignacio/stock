import { cors } from '@main/middleware';
import { createServer } from 'http';
import { setupMiddleware } from '@main/config/middleware';
import { setupRoutes } from '@main/config/routes';
import express from 'express';

const app = express();

setupMiddleware(app);
app.use(cors);
setupRoutes(app);

const http = createServer(app);

export { http, app };
