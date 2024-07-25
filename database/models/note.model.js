import { model, Schema } from "mongoose"

const noteSchema = new Schema({
    title: String,
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {
        updatedAt: false
    }
})

const Note = model('Note', noteSchema)
export default Note