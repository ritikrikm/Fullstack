function asyncHandler(requestHandler) {
    return function (req, res, next) {
        Promise.resolve(requestHandler(req, res, next)).catch(function (err) {
            // Mini async error logger to see location of error
            console.error('Async error caught:', err)
            if (req && req.originalUrl) {
                console.error(`Error occurred at route: ${req.originalUrl}`)
            }
            next(err)
        })
    }
}

export { asyncHandler }
