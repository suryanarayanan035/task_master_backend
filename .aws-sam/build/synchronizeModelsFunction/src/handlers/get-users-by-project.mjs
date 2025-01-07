import { ProjectUser, User } from "../db/connection.mjs";
export const handler = async (event) => {
  try {
    const projectId = event.pathParameters.projectId;
    console.log({ event });
    const results = await ProjectUser.findAll({
      where: { ProjectId: projectId },
      attributes: ["UserId"],
    });

    console.log({ results });
    const users = await User.findAll({
      where: { id: results.map((r) => r.UserId) },
      attributes: ["id", "email"],
    });
    console.log({ users });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ users: users || [] }),
    };
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ detail: `Error getting users: ${error.message}` }),
    };
  }
};
