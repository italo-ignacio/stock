import { numberRequired, stringNotRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const insertWorkSchema = yup.object().shape({
  body: yup.object().shape({
    destiny: stringRequired({
      english: 'destiny',
      portuguese: 'destino'
    }),
    distance: numberRequired({
      english: 'distance',
      portuguese: 'distância'
    }),
    driverId: stringNotRequired(),
    match: stringRequired({
      english: 'match',
      portuguese: 'local de saída'
    }),
    profit: numberRequired({
      english: 'profit',
      portuguese: 'lucro'
    }),
    vehicleId: stringRequired({
      english: 'id',
      portuguese: 'id'
    })
  })
});
