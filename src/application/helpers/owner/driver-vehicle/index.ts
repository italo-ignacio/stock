import { DataSource } from '@infra/database';

export const driverIsOwnerOfVehicle = async (
  driverId: string,
  vehicleId: string
): Promise<boolean> => {
  const isOwner = await DataSource.vehicleDriver.findFirst({
    where: {
      AND: {
        driverId,
        vehicleId
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
