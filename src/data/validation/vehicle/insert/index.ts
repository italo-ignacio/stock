import {
  arrayNotRequired,
  booleanNotRequired,
  stringNotRequired,
  stringRequired
} from '@main/utils';
import { yup } from '@infra/yup';

export const insertVehicleSchema = yup.object().shape({
  body: yup.object().shape({
    autoApproveCost: booleanNotRequired(),
    autoApproveWork: booleanNotRequired(),
    driverList: arrayNotRequired(
      stringRequired({
        english: 'driver id',
        portuguese: 'id do motorista'
      })
    ),
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
    }),
    vehicleFleetId: stringRequired({
      english: 'vehicle control',
      portuguese: 'controle de veíuclo'
    })
  })
});
