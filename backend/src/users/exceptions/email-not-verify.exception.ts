import { HttpStatus } from "@nestjs/common";
import { BaseException } from "@/exceptions/base.exception";

export class EmailNotVerifyException extends BaseException {
    public constructor() {
        super("Ваша электронная почта не подтверждена", HttpStatus.FORBIDDEN);
    }
}
