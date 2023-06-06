import { DataSource } from '@infra/database';

export const costIsPending = async (vehicleId: string): Promise<boolean> => {
  const notPending = await DataSource.vehicle.findFirst({
    where: {
      AND: {
        AND: {
          OR: {
            autoApproveCost: true,
            fleet: {
              autoApproveCost: true
            }
          },
          id: vehicleId
        }
      }
    }
  });

  if (notPending === null) return true;

  return false;
};
