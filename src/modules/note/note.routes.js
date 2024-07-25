import { Router } from "express";
import { addNote, deleteNote, getNotes, updateNote } from "./note.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { dataValidate } from "../../middleware/DataValidate.js";
import { noteValidation } from "./note.schemaValidation.js";
noteValidation
let notesRouter = Router()

notesRouter.use(verifyToken)
notesRouter.post('/',dataValidate(noteValidation), addNote)
notesRouter.get('/', getNotes)
notesRouter.put('/:id', updateNote)
notesRouter.delete('/:id', deleteNote)

export default notesRouter