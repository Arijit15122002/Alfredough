import dotenv from 'dotenv'
import connectDB from './database/index.js'
import { app } from './app.js'

dotenv.config({
    path: './env'
})


//calling function of connecting database
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    } )
})
.catch((error) => {
    console.error("MONGODB connection FAILED", error)
})