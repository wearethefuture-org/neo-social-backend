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
