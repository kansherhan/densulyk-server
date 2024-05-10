import { HttpStatus } from "@nestjs/common";

import { BaseException } from "@/exceptions/base.exception";

export class UserRoleNotPatientException extends BaseException {
    constructor() {
        super(
            "Роль нового доктора должно быть пациентом",
            HttpStatus.BAD_REQUEST,
        );
    }
}
