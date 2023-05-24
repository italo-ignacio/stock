import { DataSource } from '@infra/database';

export const accountIsOwnerOfVehicle = async (id: string, accountId: string): Promise<boolean> => {
  const isOwner = await DataSource.vehicle.findFirst({
    where: {
      AND: {
        id,
        vehicleFleet: {
          accountId
        }
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
