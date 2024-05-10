import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends BaseException {
    constructor() {
        super("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
}
