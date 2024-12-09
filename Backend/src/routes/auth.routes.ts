import { Router } from "express"
import { loginValidator, registerValidator } from "~/middlewares/auth.middlewares";
import { wrapRequestHandler } from "~/utils/handlers";
import { loginController, registerController } from "~/controllers/users.controllers";
const userRouters = Router();

// Register a user
// POST
// Body: { email: string, password: string, confirm_password: string }
userRouters.post('/register', registerValidator, wrapRequestHandler(registerController))


userRouters.post('/login', loginValidator, wrapRequestHandler(loginController))

export default userRouters;