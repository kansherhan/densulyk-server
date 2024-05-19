import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";

import { Doctor } from "@/doctors/models/doctors.model";
import { User } from "@/users/models/users.model";
import { PatientAppointment } from "@/patients/models/patient-appointments.model";

@Module({
    providers: [DoctorsService],
    controllers: [DoctorsController],
    imports: [SequelizeModule.forFeature([User, Doctor, PatientAppointment])],
})
export class DoctorsModule {}
