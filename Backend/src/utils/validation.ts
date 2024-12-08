import { Request, Response, NextFunction } from "express"
import {  ValidationChain, validationResult } from "express-validator"
import { HTTP_STATUS } from "~/constants/HTTPSTATUS"
import { EntityError, ErrorWithStatus } from "~/models/Errors"
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema"

const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await validation.run(req)
    const errors = validationResult(req);
    // isEmpty !== Error
    if(errors.isEmpty()) {
      return next()
    }
    const errorsObject = errors.mapped();
    const entityError = new EntityError({ errors: {} });
    for(const key in errorsObject) {
      const { msg } = errorsObject[key]
      if(msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_UNTITY) {
        return next(msg)
      }
      entityError.errors[key] = errorsObject[key]
    }
    next(entityError)
  }
};

export default validate;