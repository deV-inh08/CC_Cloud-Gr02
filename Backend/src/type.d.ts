import { User } from "./models/schema/user.request";

declare global {
  namespace Express {
    interface Request {
      user: User[]
    }
  }
}