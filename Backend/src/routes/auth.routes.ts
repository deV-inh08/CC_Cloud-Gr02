import { Router } from "express"
import { accessTokenValidator, loginValidator, refressTokenValidator, registerValidator } from "~/middlewares/auth.middlewares";
import { wrapRequestHandler } from "~/utils/handlers";
import { loginController, logOutController, registerController } from "~/controllers/users.controllers";
const userRouters = Router();

userRouters.post('/signup', registerValidator, wrapRequestHandler(registerController));

userRouters.post('/signin', loginValidator, wrapRequestHandler(loginController));

userRouters.post('/logout', accessTokenValidator, refressTokenValidator, wrapRequestHandler(logOutController))

export default userRouters;