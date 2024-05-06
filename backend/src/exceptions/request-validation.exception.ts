import { HttpStatus } from "@nestjs/common";
import { BaseException } from "./base.exception";

export class RequestValidationException extends BaseException {
    public constructor(data: any) {
        super("Заполните все поля", HttpStatus.BAD_REQUEST, data);
    }
}
