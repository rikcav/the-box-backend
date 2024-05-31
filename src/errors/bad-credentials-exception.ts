class BadCredentialsException extends HttpException {
    constructor() {
        super(401, "Bad credentials!")
    }
}