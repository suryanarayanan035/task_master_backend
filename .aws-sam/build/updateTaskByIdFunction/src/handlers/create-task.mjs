import { Task } from "../db/connection.mjs";
export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { title, description, assignee, projectId, status, priority } = body;
  try {
    const task = await Task.build({
      title,
      description,
      assignee,
      projectId,
      status,
      priority,
    }).save();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ task }),
    };
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error: `Error creating task: ${error.message}` }),
    };
  }
};
