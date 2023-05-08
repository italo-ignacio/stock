import './config/module-alias';
import { DataSource } from '@infra/database';
import { api } from '@domain/helpers';
import { env } from '@main/config';
import { errorLogger } from '@main/utils';

DataSource.$connect()
  .then(async () => {
    if (typeof env.apiPort === 'string') {
      const { http } = await import('@main/config');

      http.listen(env.apiPort, () => {
        console.info(`Server started at http://localhost:${env.apiPort}${api.baseUrl}`);
      });
    } else console.info('Environment variables missing');
  })
  .catch((error) => {
    if (error instanceof Error)
      console.error(`An error of type ${error.name} occurred. See the logs error...`);

    errorLogger(error);
  });
