import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { PatientsController } from "./patients.controller";
import { PatientsService } from "./patients.service";

import { Patient } from "@/patients/models/patients.model";
import { PatientDiagnostic } from "@/patients/models/patient-diagnostics.model";
import { PatientAppointment } from "@/patients/models/patient-appointments.model";

@Module({
    controllers: [PatientsController],
    providers: [PatientsService],
    imports: [
        SequelizeModule.forFeature([
            Patient,
            PatientDiagnostic,
            PatientAppointment,
        ]),
    ],
})
export class PatientsModule {}
