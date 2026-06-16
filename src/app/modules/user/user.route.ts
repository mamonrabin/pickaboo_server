import { Router } from "express";
import { userControllers } from "./user.controller.js";



const router = Router()



router.post("/register", userControllers.createUser)
router.get("/", userControllers.getAllUsers)
router.get("/me", userControllers.getMe)
router.get("/:id", userControllers.getSingleUser)
router.delete("/:id", userControllers.deleteSingleUser)
router.patch("/:id", userControllers.updateSingleUser)

// /api/v1/user/:id
export const UserRoutes = router