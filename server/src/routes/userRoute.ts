import express from "express";
import { userController } from "../controller/userController";
import { userSchema } from "../middleware/validator/userValidator";
import { validateRequest } from "../middleware/validateRequest";


const userRouter = express.Router();
userRouter.post("/register",validateRequest(userSchema),userController.register); //Route for userRegistration

export default userRouter;
