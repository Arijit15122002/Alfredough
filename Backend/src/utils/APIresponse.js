class APIresponse {
    constructor(
        statusCode,
        data = null,
        message = "Success",
        success = true
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = success
    }
}

export { APIresponse }