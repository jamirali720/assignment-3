import express from "express";
import cors from 'cors';

import cookieParser from "cookie-parser";
import router from "./app/router";


const app = express();



app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: "http://localhost:3000"}))
app.use(express.urlencoded({extended:true}))



app.use("/api", router)




app.get("/", (req, res) => {
    res.status(200).json({
        message: "My assignment-3 server is OK"
    })
})


export default app;