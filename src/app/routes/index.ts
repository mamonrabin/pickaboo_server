import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route.js"
import { AuthRoutes } from "../modules/auth/auth.route.js"
import { categoryRoutes } from "../modules/category/category.route.js"
import { subcategoryRoutes } from "../modules/sub-category/sub-category.route.js"
import { sizeRoutes } from "../modules/size/size.route.js"
import { colorRoutes } from "../modules/color/color.route.js"
import { brandRoutes } from "../modules/brand/brand.route.js"
import { productRoutes } from "../modules/product/product.route.js"
import { bannerRoutes } from "../modules/banner/banner.route.js"
import { orderRoutes } from "../modules/order/order.route.js"


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
    {
        path: "/sub-category",
        route: subcategoryRoutes
    },
    {
        path: "/brand",
        route: brandRoutes
    },
    {
        path: "/size",
        route: sizeRoutes
    },
    {
        path: "/color",
        route: colorRoutes
    },
    {
        path: "/product",
        route: productRoutes
    },
    {
        path: "/banner",
        route: bannerRoutes
    },
    {
        path: "/order",
        route: orderRoutes
    },
   
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

