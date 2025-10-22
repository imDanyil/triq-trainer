import { routePaths } from "../configs/routePaths";

export const buildTrainerPath = (trainerId: string): string => {
  return routePaths.trainer.replace(":trainerId", trainerId);
};
