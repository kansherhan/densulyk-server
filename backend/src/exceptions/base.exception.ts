import { HttpException, HttpStatus } from "@nestjs/common";
import { HttpStatusCode } from "@/utilities/http-status-code";

export abstract class BaseException extends HttpException {
    protected constructor(
        message: string,
        status: HttpStatus | HttpStatusCode | number,
        data: any = null,
    ) {
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
