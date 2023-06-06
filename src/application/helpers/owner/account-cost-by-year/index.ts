import { DataSource } from '@infra/database';

export const accountCanCreateCostByYear = async (
  vehicleId: string,
  id: string
): Promise<boolean> => {
  const isOwner = await DataSource.vehicle.findFirst({
    where: {
      AND: {
        AND: {
          OR: {
            fleet: {
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

export const accountCanDeleteCostByYear = async (
  costByYearId: string,
  accountId: string
): Promise<boolean> => {
  const isOwner = await DataSource.costByYear.findFirst({
    where: {
      AND: {
        AND: {
          OR: {
            vehicle: {
              fleet: {
                accountId
              }
            }
          },
          id: costByYearId
        }
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
