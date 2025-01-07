import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { User } from "../db/connection.mjs";

const USER_POOL_ID = process.env.USER_POOL_ID;
const createUserInCognito = async (username, password, user_attributes) => {
  const client = new CognitoIdentityProviderClient({});
  const input = {
    UserPoolId: USER_POOL_ID,
    Username: username,
    UserAttributes: user_attributes,
    TemporaryPassword: password,
    MessageAction: "SUPPRESS",
  };

  const command = new AdminCreateUserCommand(input);
  const response = await client.send(command);
};

export const findOrCreateUser = async (email) => {
	const user = await User.findOne({ where: { email: email } });
	if (user) {
		return user;
	}
	return await User.build({ email: email }).save();
	
});
export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const username = body.username;
  const password = body.password;
	const project = body.project;
  const user_attributes = [];
  let res = {};
  try {
	const user = await findOrCreateUser(username);
    if(!user) {await createUserInCognito(username, password, user_attributes)};
	await project.setUser(findUser);
    res = {
      statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
		body: JSON.stringify({detail: "User created successfully"}),
    };
  } catch (err) {
    console.log("Error", err);
    res = { statusCode: 500,
		headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true, }, 
		body: JSON.stringify({error: `Error creating user: ${err.message}`}) 
	};
  }
  return res;
};
