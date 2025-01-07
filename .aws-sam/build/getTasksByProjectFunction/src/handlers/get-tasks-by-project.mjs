import { Task } from "../db/connection.mjs";
export const handler = async (event) => {
  const projectId = event.pathParameters.projectId;
  try {
    const tasks = await Task.findAll({
      where: { projectId },
    });
    console.log({ tasks });
    const taskGroups = { "To Do": [], "In Progress": [], Done: [] };
    for (let task of tasks) {
      console.log({ task });
      if (task.status == 0) {
        taskGroups["To Do"].push(task);
      } else if (task.status == 1) {
        taskGroups["In Progress"].push(task);
      } else {
        taskGroups["Done"].push(task);
      }
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ taskGroups }),
    };
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error: `Error getting tasks: ${error.message}` }),
    };
  }
};
