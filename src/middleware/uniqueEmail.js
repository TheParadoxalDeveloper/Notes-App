import bcrypt from 'bcryptjs'
import User from '../../database/models/user.model.js'

export const checkEmail = async (req, res, next) => {
    let checkEmail = await User.findOne({ email: req.body.email })
    if (checkEmail) {
        return res.status(409).json({ message: "Email already exists" })
    }
    next()
}