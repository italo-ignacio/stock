import { numberRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertWorkSchema = yup.object().shape({
  body: yup.object().shape({
    destiny: stringRequired({
      english: 'license plate',
      portuguese: 'placa do veículo'
    }),
    distance: numberRequired({
      english: 'distance',
      portuguese: 'distância'
    }),
    driverId: stringNotRequired(),
    match: stringRequired({
      english: 'license plate',
      portuguese: 'placa do veículo'
    }),
    vehicleId: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
