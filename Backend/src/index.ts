import express from "express"
import cors from "cors"
import userRouters from "./routes/auth.routes"
import { config } from "dotenv"
import databaseServices from "./services/database.services";

const app = express()
const PORT = 3055

app.use(express.json())
app.use(cors())

app.use('/user', userRouters)

databaseServices.connect()


app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`)
})

