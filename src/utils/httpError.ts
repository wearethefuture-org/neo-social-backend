export class HttpError extends Error {
    statusCode: any;
    expose: any;
    body: any;
    status: any;
    constructor(statusCode: any, body: any, status?: any) {
        super(body);
        this.expose = true;

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
    constructor(error: any) {
        super(error);
        console.info(error);
        console.info('error');
        this.expose = true;

        this.statusCode = 500;
        this.body = {error};
        // this.status = status;
    }
}
