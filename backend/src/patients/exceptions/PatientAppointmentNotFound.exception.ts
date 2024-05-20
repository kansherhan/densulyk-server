import { BaseException } from "@/exceptions/base.exception";
import { HttpStatus } from "@nestjs/common";

export class PatientAppointmentNotFoundException extends BaseException {
    constructor() {
        super("Прием не найден", HttpStatus.NOT_FOUND);
    }
}
