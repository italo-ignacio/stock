import { stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertVehicleSchema = yup.object().shape({
  body: yup.object().shape({
    driverList: stringNotRequired(),
    fleetId: stringRequired({
      english: 'vehicle fleet',
      portuguese: 'frota de veíuclo'
    }),
    image: stringNotRequired(),
    licensePlate: stringRequired({
      english: 'license plate',
      portuguese: 'placa do veículo'
    }),
    name: stringRequired({
      english: 'name',
      portuguese: 'nome'
    }),
    type: stringRequired({
      english: 'type',
      portuguese: 'tipo'
    })
  })
});
