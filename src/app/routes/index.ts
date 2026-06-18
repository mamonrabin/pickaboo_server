import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route.js"
import { AuthRoutes } from "../modules/auth/auth.route.js"
import { categoryRoutes } from "../modules/category/category.route.js"


export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/category",
        route: categoryRoutes
    },
   
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

