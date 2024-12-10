import validate from "~/utils/validation";
import { Request } from "express";
import { checkSchema, ParamSchema } from "express-validator"
import { USER_MESSAGE } from "~/constants/USER_MESSAGE";
import userServices from "~/services/user.services";
import databaseServices from "~/services/database.services";
import { hashPassword } from "~/utils/crypto";
import { config } from "dotenv"
import { ErrorWithStatus } from "~/models/Errors";
import { HTTP_STATUS } from "~/constants/HTTPSTATUS";
import { verifyToken } from "~/utils/jwt";
import { JsonWebTokenError } from "jsonwebtoken";
config()

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USER_MESSAGE.PASSWORD_LENGHT_MUST_BE_FROM_6_TO_150
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1
    }
  },
  errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG
};

const confirmPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_LENGHT_MUST_BE_FROM_6_TO_150
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1
    },
    errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
  },
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password_confirm is not match password")
      } else {
        return true
      }
    }
  }
};

const registerValidator = validate(checkSchema({
  email: {
    notEmpty: {
      errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value) => {
        const isExitsEmail = await userServices.checkEmailExits(value)
        if (isExitsEmail) {
          throw new Error(USER_MESSAGE.EMAIL_ALREADY_EXISTS)
        }
        return true
      }
    }
  },
  password: passwordSchema,
  confirm_password: confirmPasswordSchema,
}, ['body']
))

const loginValidator = validate(checkSchema({
  email: {
    notEmpty: {
      errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED,
    },
    isEmail: {
      errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await databaseServices.query(
          'SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1', 
          [value, hashPassword(req.body.password)]
        );
        if (user === null) {
          throw new Error(USER_MESSAGE.EMAIL_OR_PASSWORD_INCORRECT)
        }
        req.user = user;
        return true
      }
    }
  },
  password: passwordSchema
}, ['body']
));

const accessTokenValidator = validate(checkSchema({
  access_token: {
    notEmpty: {
      errorMessage: USER_MESSAGE.ACCESS_TOKEN_IS_REQUIRED
    },
    custom: {
      options: async (value: string, { req }) => {
        const access_token = value.split(' ')[1]
        if(!access_token) {
          throw new ErrorWithStatus({
            message: USER_MESSAGE.ACCESS_TOKEN_IS_REQUIRED,
            status: HTTP_STATUS.UNAUTHORIZED
          })
        }
        const decoded_authorization = await verifyToken({ token: access_token, secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string });
        ;(req as Request).decoded_authorization = decoded_authorization
        return true
      }
    }
  }
}, ['body']
))

const refressTokenValidator = validate(checkSchema({
  refresh_token: {
    trim: true,
    custom: {
      options: async (value: string, { req }) => {
        if(!value) {
          throw new ErrorWithStatus({
            message: USER_MESSAGE.REFRESH_TOKEN_IS_REQUIRED,
            status: HTTP_STATUS.UNAUTHORIZED
          })
        }
        try {
          const decoded_refresh_token = await verifyToken({ token: value, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string })
          const refresh_token = await databaseServices.query('SELECT refresh_token FROM users WHERE refresh_token = $1', [value])
          if(refresh_token === null) {
            throw new ErrorWithStatus({
              message: USER_MESSAGE.USED_REFRESH_TOKEN_OR_NOT_EXITS,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          };
          ;(req as Request).decoded_refresh_token = decoded_refresh_token

        } catch(error) {
          if(error instanceof JsonWebTokenError) {
            throw new ErrorWithStatus({
              message: (error as JsonWebTokenError).message,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
          throw error
        }
        return true
      }
    }
  }
}, ['body']
))


export {
  registerValidator,
  loginValidator,
  accessTokenValidator,
  refressTokenValidator
}