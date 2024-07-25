import User from "../../../database/models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import Note from "../../../database/models/note.model.js"
import { emailHandler } from "../../../emails/emailHandler.js"
import { errorHandling } from "../../middleware/errorHandling.js"
import { AppError } from "../../utils/AppError.js"
import Joi from "joi"



export const signup = errorHandling(async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    const newUser = await User.insertMany(req.body)
    emailHandler(req.body.email)
    newUser[0].password = undefined
    res.status(201).json({ message: "User Registered, Please Check Your Email For Verification!", newUser })
})

export const signin = errorHandling(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return next(new AppError("Invalid Credentials!", 401))
    }

    jwt.sign({
        userId: user._id,
        name: user.name,
        role: user.role
    }, 'Thet0pp@radoxalSecretKey', (err, token) => {
        user.password = undefined
        res.status(200).json({ message: "User Signed In!...token", token })
    })

})

export const updateUser = errorHandling(async (req, res, next) => {
    let UpdatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!UpdatedUser) return next(new AppError("User Not Found!", 404))
    UpdatedUser.password = undefined
    res.status(200).json({ message: "User Updated!", UpdatedUser })
})

export const deleteUser = errorHandling(async (req, res, next) => {
    let deletedUser = await User.findByIdAndDelete(req.params.id)
    let relatedNotes = await Note.deleteMany({ user: req.params.id })
    if (!deletedUser) return next(new AppError("User Not Found!", 404))
    deletedUser.password = undefined
    res.status(200).json({ message: "User deleted!", deletedUser: deletedUser, relatedNotes: relatedNotes })
})

