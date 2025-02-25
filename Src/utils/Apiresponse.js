class ApiResponse {
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode;
        this.data = data;  // Fixing the typo here
        this.message = message;
        this.success = statusCode < 400;
    }
}

export  {ApiResponse};
