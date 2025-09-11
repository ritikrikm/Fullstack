import { ZodError } from 'zod'

export const validatorEngine = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'ValidationFailed',
                details: error.issues,
            })
        }
        next(error)
    }
}
