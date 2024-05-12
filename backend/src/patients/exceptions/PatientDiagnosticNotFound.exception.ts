import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class PatientDiagnosticNotFoundException extends BaseException {
    constructor() {
        super(
            "По этим данный данные о диагностике не найдены",
            HttpStatus.NOT_FOUND,
        );
    }
}
