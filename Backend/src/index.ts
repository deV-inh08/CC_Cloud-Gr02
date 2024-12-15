import express from "express"
import cors from "cors"
import userRouters from "./routes/auth.routes"
import { config } from "dotenv"
import databaseServices from "./services/database.services";

config()

databaseServices.connect()

const app = express()
const PORT = 8080

app.use(express.json())

app.use(cors())

app.use('/users', userRouters)


app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`)
});

// DB_USER = 'postgres'
// DB_PASSWORD = 'postgres'
// DB_NAME = 'e-commerce'
// DB_HOST = '35.193.221.186'
// DB_PORT = '5432'

// JWT_SECRET = 'ggcloud1234554321!@#'
// JWT_SECRET_ACCESS_TOKEN = 'ggcloud1234554321!@#'
// JWT_SECRET_REFRESH_TOKEN = 'ggcloud1234554321!@#@'
// JWT_SECRET_EMAIL_VERIFY_TOKEN = 'ggcloud1234554321!@#$#'
// JWT_SECRET_FORGOT_PASSWORD_TOKEN = 'ggcloud12344321!@#$#'

// EMAIL_VERIFY_TOKEN_EXPIRES_IN = '7d'

// ACCESS_TOKEN_EXPIRES_IN = '15m'
// REFRESH_TOKEN_EXPIRES_IN = '100d'



// DB_USER = 'postgres'
// DB_PASSWORD = 'postgres'
// DB_NAME = 'e-commerce'
// INSTANCE_CONNECTION_NAME = 'nlu-gcp-hk241-group01:us-central1:cc-group02'
// DB_PORT = '5432'

// PRIVATE_IP = '1'
// PORT = '8080'

// JWT_SECRET = 'ggcloud1234554321!@#'
// JWT_SECRET_ACCESS_TOKEN = 'ggcloud1234554321!@#'
// JWT_SECRET_REFRESH_TOKEN = 'ggcloud1234554321!@#@'
// JWT_SECRET_EMAIL_VERIFY_TOKEN = 'ggcloud1234554321!@#$#'
// JWT_SECRET_FORGOT_PASSWORD_TOKEN = 'ggcloud12344321!@#$#'

// EMAIL_VERIFY_TOKEN_EXPIRES_IN = '7d'

// ACCESS_TOKEN_EXPIRES_IN = '15m'
// REFRESH_TOKEN_EXPIRES_IN = '100d'
