import { JwtPayload } from "jsonwebtoken"
import { TokenType, UserVerifyStatus } from "~/constants/enum"

export interface RegisterReqBody {
  email: string
  password: string
  confirm_password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
}