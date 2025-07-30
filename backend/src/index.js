import express from "express"; 
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"

dotenv.config(); 

const app = express(); 

const PORT = process.env.PORT

// to extract json data out of body
// run this beofore calling any routes as the routes will be needing 
// parsing json data which won't work if run before express.json() middleware
app.use(express.json()) 
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
    connectDB()
}) 

