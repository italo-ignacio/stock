import { DataSource } from '@infra/database';

export const accountIsOwnerOfDriver = async (
  driverId: string,
  accountId: string
): Promise<boolean> => {
  const isOwner = await DataSource.driver.findFirst({
    where: {
      AND: {
        accountId,
        id: driverId
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
