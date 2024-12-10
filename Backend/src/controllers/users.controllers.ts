import { Request, Response, NextFunction } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { LoginReqBody, LogoutRequestBody, RegisterReqBody } from "~/models/requests/user.request"
import userServices from "~/services/user.services"
import { USER_MESSAGE } from "~/constants/USER_MESSAGE"
import { config } from "dotenv"
import { User } from "~/models/schema/user.request"
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
  const user: Exclude<User[] ,undefined> = (req.user) as User[] ;
  const result = user[0]
  res.json({
    message:USER_MESSAGE.LOGIN_SUCCESS,
    data: result
  })
}

const logOutController = async (req: Request<ParamsDictionary, any, LogoutRequestBody>, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body;
  const result = await userServices.logout(refresh_token)
  return res.json({
    message: USER_MESSAGE.LOGOUT_SUCCESS,
    result: result
  })
}

export {
  registerController,
  loginController,
  logOutController
}