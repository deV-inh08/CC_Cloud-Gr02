import {Request ,Response, NextFunction } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { RegisterReqBody } from "~/models/requests/user.request"

const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) => {


}