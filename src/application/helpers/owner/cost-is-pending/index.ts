import { DataSource } from '@infra/database';

export const costIsPending = async (costByMonthId: string): Promise<boolean> => {
  const notPending = await DataSource.costByMonth.findFirst({
    where: {
      AND: {
        AND: {
          OR: {
            costByYear: {
              vehicle: {
                autoApproveCost: true,
                vehicleFleet: {
                  autoApproveCost: true
                }
              }
            }
          },
          id: costByMonthId
        }
      }
    }
  });

  if (notPending === null) return true;

  return false;
};
