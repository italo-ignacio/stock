import { DataSource } from '@infra/database';

export const accountIsOwnerOfFleet = async (
  fleetId: string,
  accountId: string
): Promise<boolean> => {
  const isOwner = await DataSource.fleet.findFirst({
    where: {
      AND: {
        accountId,
        id: fleetId
      }
    }
  });

  if (isOwner !== null) return true;

  return false;
};
