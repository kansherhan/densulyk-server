import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class WrongRoleException extends BaseException {
    constructor() {
        super(
            "У вас недостаточно доступа или вам с вашей ролей нельзя",
            HttpStatus.FORBIDDEN,
        );
    }
}
