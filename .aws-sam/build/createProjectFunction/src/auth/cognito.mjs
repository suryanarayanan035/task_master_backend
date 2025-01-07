import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { jwtDecode } from "jwt-decode";
const pool = new CognitoIdentityProviderClient({
  region: "ap-south-1",
  UserPoolId: process.env.USER_POOL_ID,
});

export const getUserFromToken = async (accessToken) => {
  const user = jwtDecode(accessToken);
  return user;
};
