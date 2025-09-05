import { validationResult } from 'express-validator'

const validationEngine = (req, res, next) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        return next()
    }
    // Yes, you can use 'path'! Each error object from error.array() looks like:
    // {
    //   type: 'field',
    //   value: <the value received>,
    //   msg: <the error message>,
    //   path: <the field name>,
    //   location: <'body' | 'query' | ...>
    // }
    // For example, to show errors in a good way:
    // console.log(error)
    // console.log(validationResult)
    const formattedErrors = error.array().map((err) => ({
        field: err.path,
        message: err.msg,
    }))
    return res.status(400).json({ errors: formattedErrors })
}

export { validationEngine }
