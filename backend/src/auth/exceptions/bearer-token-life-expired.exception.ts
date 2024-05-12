import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class BearerTokenLifeExpiredException extends BaseException {
    constructor() {
        super(
            "Время жизни вашего токена истекло, еще раз авторизируйтесь",
            HttpStatus.UNAUTHORIZED,
        );
    }
}
