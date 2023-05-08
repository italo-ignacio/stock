import { DataSource } from '@infra/database';

export const accountIsOwnerOfVehicle = async (
  vehicleId: string,
  accountId: string
): Promise<boolean> => {
  const isOwner = await DataSource.vehicle.findFirst({
    where: {
      AND: {
        VehicleFleet: {
          accountId
        },
        id: vehicleId
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
