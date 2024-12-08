import validate from "~/utils/validation";
import { checkSchema, ParamSchema } from "express-validator"
import { USER_MESSAGE } from "~/constants/MESSAGES";

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
  name: {
    errorMessage: USER_MESSAGE.NAME_IS_REQUIRED,
    isString: {
      errorMessage: USER_MESSAGE.NAME_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 2,
        max: 255
      },
      errorMessage: USER_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100
    },
    trim: true
  },
  password: passwordSchema,
  confirm_password: confirmPasswordSchema,
}))

export {
  registerValidator,
  
}