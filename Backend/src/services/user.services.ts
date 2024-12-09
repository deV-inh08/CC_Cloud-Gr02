import { TokenType, UserVerifyStatus } from "~/constants/enum";
import { signToken } from "~/utils/jwt";

class UsersServices {
  private signEmailVerifyToken({user_id, verify}: {user_id: string, verify: UserVerifyStatus}) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      option: {
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
      }
    })
  }
  private signAccessToken() {
    
  }
}