import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class Auth2FAVerifyException extends BaseException {
    constructor() {
        super("Ошибка при 2FA", HttpStatus.FORBIDDEN);
    }
}
