import { sequelize } from "./connection.mjs";

export const synchronizeAllModels = async () => {
  await sequelize.sync();
};
