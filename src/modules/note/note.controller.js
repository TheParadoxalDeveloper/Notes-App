import Note from "../../../database/models/note.model.js"
import { errorHandling } from "../../middleware/errorHandling.js"
import { AppError } from "../../utils/AppError.js"

export const addNote = errorHandling(async (req, res) => {
    let newNote = await Note.insertMany(req.body)
    res.status(201).json({ message: "Note Added!", newNote })
})

export const getNotes = errorHandling(async (req, res) => {
    let AllNotes = await Note.find({ user: req.user.userId }).populate('user', ['_id', 'name'])
    res.status(200).json({ message: "Notes Retreived!", AllNotes })

})

export const updateNote = errorHandling(async (req, res, next) => {
    let UpdatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!UpdatedNote) return next(new AppError("Note Not Found!", 404))
    res.status(200).json({ message: "Note Updated!", UpdatedNote })
})

export const deleteNote = errorHandling(async (req, res, next) => {
    let deletedNote = await Note.findByIdAndDelete(req.params.id)
    if (!deletedNote) return next(new AppError("Note Not Found!", 404))
    // res.status(404).json({ message: "Note Not Found!" })
    res.status(200).json({ message: "Note deleted!", deletedNote })
})


