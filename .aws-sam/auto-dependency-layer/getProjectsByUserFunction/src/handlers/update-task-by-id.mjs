import { Task } from "../db/connection.mjs";
export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const taskId = event.pathParameters.taskId;
    const { title, description, status, assignee } = body;
    const valuesToUpdate = {};
    if (title) valuesToUpdate.title = title;
    if (description) valuesToUpdate.description = description;
    if (status) valuesToUpdate.status = status;
    valuesToUpdate.assignee = assignee || null;

    await Task.update({ ...valuesToUpdate }, { where: { id: taskId } });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Task updated successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
