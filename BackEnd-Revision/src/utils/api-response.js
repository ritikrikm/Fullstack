class API_RESPONSE {
    constructor(statusCode , data , message = "Sucess" , isSuccess){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message; 
        this.isSuccess = statusCode < 400;
    }
}
export {API_RESPONSE};