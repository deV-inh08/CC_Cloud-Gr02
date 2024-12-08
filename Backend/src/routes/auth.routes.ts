import { Router } from "express"
import { registerValidator } from "~/middlewares/auth.middlewares";
const userRouters = Router();

// Register a user
// POST
// Body: { email: string, password: string, confirm_password: string }
userRouters.post('/register', registerValidator)


export default userRouters;