import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class EmailVerificationErrorException extends BaseException {
    constructor() {
        super(
            "Неверный код или не истек время действия кода, проверьте код",
            HttpStatus.BAD_REQUEST,
        );
    }
}
