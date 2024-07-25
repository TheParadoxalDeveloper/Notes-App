import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    password: {
        type: String
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum:['user','admin'],
        default: 'user'

    }
}, {
    timestamps: {
        updatedAt: false
    }
})

const User = model('User', userSchema)
export default User

