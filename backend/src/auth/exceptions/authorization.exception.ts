import { HttpStatus } from "@nestjs/common";
import { BaseException } from "@/exceptions/base.exception";

export class AuthorizationException extends BaseException {
    public constructor() {
        super("Неверный пароль или имя пользователя", HttpStatus.BAD_REQUEST);
    }
}
