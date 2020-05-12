export class HttpError extends Error {
    statusCode: any;
    expose: any;
    body: any;
    status: any;
    isHttpError: boolean;
    constructor(statusCode: any, body: any, status?: any) {
        super(body);
        this.expose = true;
        this.isHttpError = true;
        this.statusCode = statusCode;
        this.body = body;
        this.status = status;
    }
}

export class HttpServerError extends Error {
    statusCode: any;
    expose: any;
    body: any;
    status: 500;
    constructor(error: any, body?: any, status?: any) {
        super(error.message ? error.message : (error.isHttpError ? error.body : error));
        this.expose = true;

        this.statusCode = 500;
        this.body =  error.isHttpError ? error.body : {error: body ? body : error};
        this.status = status ? status : 'Server Error';
    }
}
