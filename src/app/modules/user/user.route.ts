import { Router } from "express";
import { userControllers } from "./user.controller.js";


const router = Router()



router.post("/register", userControllers.createUser)

// /api/v1/user/:id
export const UserRoutes = router