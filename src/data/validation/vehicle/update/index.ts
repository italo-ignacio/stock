import { arrayNotRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateVehicleSchema = yup.object().shape({
  body: yup.object().shape({
    driverList: arrayNotRequired(
      stringRequired({
        english: 'driver id',
        portuguese: 'id do motorista'
      })
    ),
    image: stringNotRequired(),
    licensePlate: stringNotRequired(),
    name: stringNotRequired(),
    type: stringNotRequired()
  }),
  params: yup.object().shape({
    id: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
