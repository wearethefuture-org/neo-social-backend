export class SuccessResponse extends Response{
    statusCode: any;
    expose: any;
    body: any;
    status: 200;
    isSuccessResponse: boolean;
    constructor(statusCode: any, body: any, status?: any) {
        super(body);
        this.expose = true;
        this.isSuccessResponse = true;
        this.statusCode = statusCode;
        this.body = body;
        this.status = status;
    }
}