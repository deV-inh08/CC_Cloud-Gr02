import { TokenType, UserVerifyStatus } from '~/constants/enum';
import { RegisterReqBody } from '~/models/requests/user.request';
import { signToken } from '~/utils/jwt';
import { hashPassword } from '~/utils/crypto';
import { v4 as uuidv4 } from "uuid"
import databaseServices from './database.services';
import { config } from "dotenv"
config()

type checkEmailExistsType = {
  exists: number
}

type checkUserLogout = {
  rowCount: number
}

class UsersServices {
  private async signEmailVerifyToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify,
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      option: {
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN,
      },
    });
  }

  private async signAccessToken({ user_id, verify }: { user_id: string, verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      option: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }

    })
  }

  private async signRefreshToken({ user_id, verify }: { user_id: string, verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      option: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken({user_id, verify}: {user_id: string, verify: UserVerifyStatus}) {
    return Promise.all([
      this.signAccessToken({ user_id, verify }),
      this.signRefreshToken({ user_id, verify })
    ])
  }

  async register(payload: RegisterReqBody) {
    const date = new Date()
    try {
      const user_id = uuidv4();
      const email_verify_token = await this.signEmailVerifyToken({
        user_id: user_id,
        verify: UserVerifyStatus.Unverified,
      });
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken({ 
        user_id: user_id.toString(), 
        verify: UserVerifyStatus.Unverified 
      })
      const hashedPassword = hashPassword(payload.password);
      await databaseServices.query(`
        INSERT INTO users (user_id, email, password, email_verify_token, created_at, refresh_token)
        VALUES ($1, $2, $3, $4, $5, $6)`, [
        user_id,
        payload.email,
        hashedPassword,
        email_verify_token,
        date,
        refresh_token
      ]);
      return {
        access_token,
        refresh_token
      }
    } catch (err) {
      await databaseServices.query('ROLLBACK');
      throw err;
    }
  }

  async checkEmailExits(email: string) {
    const user: checkEmailExistsType[] = await databaseServices.query(`SELECT 1 AS exists FROM users WHERE email = $1 LIMIT 1`, [ email ]);
    if(user.length > 0) {
      return true
    } else {
      return false
    }
    
  }

  async logout(refresh_token: string) {
    try {
      const result = await databaseServices.query<{rowCount: number}>('UPDATE users SET refresh_token = NULL WHERE refresh_token = $1', [refresh_token]);
      if(result.rowCount === 0) {
        throw new Error("Refresh token not found")
      }
      return result
    } catch(error) {
      throw error
    }
  }
}

const userServices = new UsersServices();
export default userServices;
