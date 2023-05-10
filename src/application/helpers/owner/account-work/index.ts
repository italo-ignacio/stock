import { DataSource } from '@infra/database';

export const accountIsOwnerOfWork = async (
  workId: string,
  accountId?: string,
  driverId?: string
): Promise<boolean> => {
  const isOwner = await DataSource.work.findFirst({
    where: {
      AND: {
        OR: {
          driver: {
            accountId
          },
          driverId
        },
        id: workId
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
