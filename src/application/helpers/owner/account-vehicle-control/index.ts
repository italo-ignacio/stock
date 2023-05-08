import { DataSource } from '@infra/database';

export const accountIsOwnerOfVehicleFleet = async (
  vehicleFleetId: string,
  accountId: string
): Promise<boolean> => {
  const isOwner = await DataSource.vehicleFleet.findFirst({
    where: {
      AND: {
        accountId,
        id: vehicleFleetId
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
