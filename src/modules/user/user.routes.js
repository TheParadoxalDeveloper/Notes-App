import { Router } from "express";
import { deleteUser, signin, signup, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/uniqueEmail.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { dataValidate } from "../../middleware/DataValidate.js";
import { signinValidation, signupValidation } from "./user.schemaValidation.js";


let userRouter = Router()

userRouter.post('/signup', dataValidate(signupValidation), checkEmail, signup)
userRouter.post('/signin', dataValidate(signinValidation), signin)
userRouter.put('/:id', verifyToken, updateUser)
userRouter.delete('/:id', verifyToken, deleteUser)

export default userRouter