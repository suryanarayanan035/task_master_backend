import { Task } from "../db/connection.mjs";
export const handler = async (event) => {
  try {
    const { taskId } = event.pathParameters;
    const task = await Task.findOne({ where: { id: taskId } });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ task }),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error }),
    };
  }
};
