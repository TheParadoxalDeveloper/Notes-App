export const globalError = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({ error: "ERRRORR!", message: err.message, code: err.statusCode, stack: err.stack })
}