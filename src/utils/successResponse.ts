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

// export const users = async (ctx: any): Promise<void> => {
//     try {
//         const userService = new UserService();
//         const result = await userService.getUsers();

//         ctx.response.body = result;
//         ctx.response.status = SuccessResponse.getStatus();
//     } catch (e) {
//         throw new HttpError(e);
//     }
// tslint:disable-next-line: eofline
// }