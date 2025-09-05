class API_ERROR extends Error{
    constructor(statusCode , message , error = [] , success , stack = ""){
        super(message)
        this.statusCode = statusCode;
        this.error = error
        this.success  = false;
        if(stack) this.stack = stack
        else{
            Error.captureStackTrace(this , this.constructor); //not sure
        }
    }
}
export {API_ERROR}