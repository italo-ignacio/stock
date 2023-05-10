import { DataSource } from '@infra/database';

export const accountCanCreateCost = async (
  costByMonthId: string,
  accountId: string
): Promise<boolean> => {
  const isOwner = await DataSource.costByMonth.findFirst({
    where: {
      AND: {
        AND: {
          costByYear: {
            vehicle: {
              vehicleDriver: {
                every: {
                  driver: {
                    OR: {
                      accountId,
                      id: accountId
                    }
                  }
                }
              }
            }
          },
          id: costByMonthId
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
