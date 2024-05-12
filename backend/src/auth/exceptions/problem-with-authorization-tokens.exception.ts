import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class ProblemWithAuthorizationTokensException extends BaseException {
    constructor() {
        super("Проблема с токенами авторизации", HttpStatus.BAD_REQUEST);
    }
}
