import { Router } from "express"
import { accessTokenValidator, loginValidator, refressTokenValidator, registerValidator } from "~/middlewares/auth.middlewares";
import { wrapRequestHandler } from "~/utils/handlers";
import { loginController, logOutController, registerController } from "~/controllers/users.controllers";
const userRouters = Router();

// Register a user
// POST
// Body: { email: string, password: string, confirm_password: string }


userRouters.post('/signup', registerValidator, wrapRequestHandler(registerController));


userRouters.post('/login', loginValidator, wrapRequestHandler(loginController));


userRouters.post('/logout', accessTokenValidator, refressTokenValidator, wrapRequestHandler(logOutController))

export default userRouters;