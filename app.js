process.on('uncaughtException',(error)=>[
    console.log('uncaughtException triggered',error),
])
import express from 'express'
import userRouter from './src/modules/user/user.routes.js'
import notesRouter from './src/modules/note/note.routes.js'
import { dbConnection } from './database/dbConnection.js'
import User from "./database/models/user.model.js"
import { set } from 'mongoose'
import jwt from 'jsonwebtoken'
import { errorHandling } from './src/middleware/errorHandling.js'
import { AppError } from './src/utils/AppError.js'
import { globalError } from './src/middleware/globalError.js'


const app = express()
const port = 3055

app.use(express.json())

app.use('/users', userRouter)
app.use('/notes', notesRouter)

app.get('/verify/:token', errorHandling(async (req, res) => {

    jwt.verify(req.params.token, 'secretKeyEmail', async (err, decoded) => {
        if (err) return res.status(400).json({ message: 'Invalid token' })
        await User.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true })
        res.send({ message: "verification completed", email: decoded.email })
    })
}))

app.use('*', (req, res, next) => {
    // res.status(404).json({ error: "404", message:  })
    next(new AppError(`Path ${req.originalUrl} Doesn't Exist!`, 404))
})

app.use(globalError)

process.on('unhandledRejection', (error) => {
    console.log(error.name, error.message)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))