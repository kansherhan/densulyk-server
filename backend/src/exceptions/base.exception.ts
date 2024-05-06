import { HttpException, HttpStatus } from "@nestjs/common";

export abstract class BaseException extends HttpException {
    public constructor(message: string, status: HttpStatus, data: any = null) {
        super(
            {
                message,
                data,
                statusCode: status,
            },
            status,
        );
    }
}
