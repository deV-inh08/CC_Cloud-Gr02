import { Request, Response, NextFunction } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { LoginReqBody, RegisterReqBody } from "~/models/requests/user.request"
import userServices from "~/services/user.services"
import { USER_MESSAGE } from "~/constants/USER_MESSAGE"
import { config } from "dotenv"
config()

const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.register(req.body)
    res.json({
      message: USER_MESSAGE.REGISTER_SUCCESS,
      data: result
    })
  } catch(err: any) {
    res.status(400).json({
      error: err.mes
    })
  }
}

const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response, next: NextFunction) => {
  const user = req.user ;
  const result = user[0]
  res.json({
    message:USER_MESSAGE.LOGIN_SUCCESS,
    data: result
  })

}

export {
  registerController,
  loginController
}