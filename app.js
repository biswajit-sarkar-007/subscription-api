import express from "express"
import {PORT} from './config/env.js'

import  userRouter from './routes/user.routes.js'
import  authRouter from './routes/auth.routes.js'
import  subsRouter from './routes/subscription.routes.js'
import connetectToDatabase from "./database/mongodb.js"
import errorMiddleware from "./middleware/error.middleware.js"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subs', subsRouter);

app.use(errorMiddleware)

app.get("/",(req,res)=>{
    res.send("helooo , welcome to ")
})

app.listen( PORT,async ()=>{
    console.log(`server is listening on port ${PORT} `);
    await connetectToDatabase();
})

export default app;