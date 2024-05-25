import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}, {
    origin: ["https://deploy.mern.lwhq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}))

//configuration
app.use(express.json({limit:"16mb"}))
app.use(express.urlencoded({extended: true, limit:"16mb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import 
import userRouter from './routes/user.routes.js'
import blogsRouter from './routes/blogs.routes.js'

//routes declaration
app.use('/user', userRouter)
app.use('/blogs', blogsRouter)

export {app};