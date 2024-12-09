import validate from "~/utils/validation";
import { checkSchema, ParamSchema } from "express-validator"
import { USER_MESSAGE } from "~/constants/USER_MESSAGE";
import userServices from "~/services/user.services";
import databaseServices from "~/services/database.services";
import { hashPassword } from "~/utils/crypto";
import { config } from "dotenv"
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
        console.log(req)
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


export {
  registerValidator,
  loginValidator
}