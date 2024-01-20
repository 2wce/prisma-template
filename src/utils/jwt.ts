import http from "http";
import { sign, verify } from "jsonwebtoken";
import { clone } from "lodash";

interface Token {
  id: string;
}

type User = {
  id: string;
};

// get user id from auth token
export function getUserId(request: http.IncomingMessage): string | undefined {
  if (request?.headers) {
    const Authorization = request.headers.authorization;

    if (Authorization) {
      const token = Authorization.replace("Bearer ", "");

      const verifiedToken = verify(token, process.env.JWT_SECRET) as Token;

      return verifiedToken?.id;
    }
  }
  return undefined;
}

// issue new token based on payload
export const issue = (payload: string | User | Buffer, jwtOptions = {}) => {
  return sign(clone(payload), process.env.JWT_SECRET, jwtOptions);
};
