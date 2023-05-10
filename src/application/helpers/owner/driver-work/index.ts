import { DataSource } from '@infra/database';

export const accountCanCreateWork = async (vehicleId: string, id: string): Promise<boolean> => {
  const isOwner = await DataSource.vehicle.findFirst({
    where: {
      AND: {
        AND: {
          OR: {
            vehicleDriver: {
              every: {
                driverId: id
              }
            },
            vehicleFleet: {
              accountId: id
            }
          },
          id: vehicleId
        }
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};

export const accountCanUpdateWork = async (id: string, accountId: string): Promise<boolean> => {
  const isOwner = await DataSource.work.findFirst({
    where: {
      AND: {
        AND: {
          OR: {
            driverId: accountId,
            vehicle: {
              vehicleFleet: {
                accountId
              }
            }
          },
          id
        }
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
