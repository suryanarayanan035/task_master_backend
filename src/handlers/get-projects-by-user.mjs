import { getUserFromToken } from "../auth/cognito.mjs";
import { User, Project } from "../db/connection.mjs";

export const getProjectsByUser = async (email) => {
  const user = await User.findOne({ where: { email }, include: Project });
  return user;
};
export const handler = async (event) => {
  try {
    const accessToken = event.headers["Authorization"];
    const user = await getUserFromToken(accessToken);
    const result = await getProjectsByUser(user.email);
    console.log({ result });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ projects: result?.Projects || [] }),
    };
  } catch (error) {
    console.log({ error });
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
