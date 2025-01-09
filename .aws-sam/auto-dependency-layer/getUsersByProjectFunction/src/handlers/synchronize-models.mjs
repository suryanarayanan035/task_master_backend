import { synchronizeAllModels } from "../db/synchronizeModels.mjs";
export const handler = async () => {
  try {
    await synchronizeAllModels();
    return {
      statusCode: 200,
      body: JSON.stringify({ detail: "Models synchronized" }),
    };
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ detail: "Error synchronizing models" }),
    };
  }
};
