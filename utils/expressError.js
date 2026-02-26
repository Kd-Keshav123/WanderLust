// Error Handling Class Here  
// // when we want to create custom error code and message

class expressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode=statusCode;
        this.message=message;
    }
}

module.exports = expressError;