import { logger } from '../Utils/logger.js'
const globalErrorHandler = (error, req, res, next) => {
    // This snippet logs error details using the application's logger.
    // It records the error message, stack trace, request URL, HTTP method, and client IP address.
    // For example, if a JsonWebTokenError occurs, the logger output in the console might look like:
    // Error: jwt malformed {
    //   stack: 'JsonWebTokenError: jwt malformed\n    at ...',
    //   url: '/protected/user/profile',
    //   method: 'GET',
    //   ip: '::1'
    // }
    // For more information on error handling in Express, see:
    // https://expressjs.com/en/guide/error-handling.html
    logger.error(`Error: ${error.message}`, {
        error: error.message,
        type: error.name,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userId: req.user?._id,
        timestamp: new Date().toISOString(),
    })
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token',
            success: false,
        })
    }
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: 'Token expired',
            success: false,
        })
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            success: false,
            errors: error.errors,
        })
    }
    if (error.name === 'CastError') {
        return res.status(400).json({
            message: `Invalid ${error.path} format`,
            success: false,
        })
    }
    if (error.name === 'BSONError') {
        return res.status(400).json({
            message: 'Invalid ID format provided',
            success: false,
        })
    }
    if (error.code === 11000) {
        return res.status(409).json({
            message: 'Duplicate entry',
            success: false,
        })
    }
    if (error.statusCode) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
        })
    }
    res.status(500).json({
        message: 'Internal server error',
        success: false,
    })
}
export default globalErrorHandler
