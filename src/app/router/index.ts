import { Router } from "express";
import authRouter from "../../auth/auth.routes";
import userRouter from "../../user/user.routes";
import bikeRouter from './../../bike/bike.routes';



const router = Router();


const moduleRoutes  = [
    {
        path: "/auth", 
        route: authRouter,
    },
    {
        path: "/users", 
        route: userRouter,
    },
    {
        path: "/bikes", 
        route: bikeRouter,
    }
]



moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;

