class API_RESPONSE {
    constructor(statusCode, message = 'Successfull', data = [], isSuccess) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.isSuccess = statusCode <= 400 ? true : false
    }
}
export { API_RESPONSE }
