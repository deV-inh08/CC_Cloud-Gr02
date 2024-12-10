import { TokenPayload } from "./models/requests/user.request";
import { User } from "./models/schema/user.request";
import { Request } from "express";

declare module 'express' {
  interface Request {
    user?: User[]
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}