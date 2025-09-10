class API_ERROR extends Error {
    constructor(statusCode, message, isSuccess, error = [], stack = '') {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        this.isSuccess = false
        if (stack) this.stack = stack
        else {
            Error.captureStackTrace(this, constructor)
        }
    }
}
export { API_ERROR }
