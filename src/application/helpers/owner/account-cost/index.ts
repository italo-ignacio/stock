import { DataSource } from '@infra/database';

export const accountCanCreateCost = async (
  vehicleId: string,
  accountId: string
): Promise<boolean> => {
  const isOwner = await DataSource.vehicle.findFirst({
    where: {
      AND: {
        fleet: {
          accountId
        },
        id: vehicleId
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};

export const driverCanCreateCost = async (
  vehicleId: string,
  driverId: string
): Promise<boolean> => {
  const isOwner = await DataSource.driver.findFirst({
    where: {
      AND: {
        id: driverId,
        vehicleDriver: {
          every: {
            vehicleId
          }
        }
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};

export const accountOwnerCost = async (costId: string, accountId: string): Promise<boolean> => {
  const isOwner = await DataSource.cost.findFirst({
    where: {
      AND: {
        AND: {
          OR: {
            driver: {
              accountId
            }
          },
          id: costId
        }
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
