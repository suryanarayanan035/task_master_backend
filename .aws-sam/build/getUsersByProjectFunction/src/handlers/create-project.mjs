import { Project, User } from "../db/connection.mjs";
import { getUserFromToken } from "../auth/cognito.mjs";
export const createProjectHandler = async (event) => {
  const body = JSON.parse(event.body);
  const { projectName } = body;
  try {
    const accessToken = event.headers["Authorization"];
    const user = await getUserFromToken(accessToken);
    const owner = await User.findOne({ where: { email: user.email } });
    const project = await Project.create({
      name: projectName,
      owner: owner.id,
    });
    await project.setUsers([owner.id]);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ project }),
    };
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ detail: "Error creating project" }),
    };
  }
};
