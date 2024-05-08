import { Body, Controller, Get, Post, Req } from "@nestjs/common";

import { PatientsService } from "@/patients/patients.service";
import { Roles } from "@/roles/decorators/roles-auth.decorator";
import { CreatePatientAppointmentDto } from "@/patients/dto/create-patient-appointment.dto";
import { CreateAndUpdatePatientDto } from "@/patients/dto/create-and-update-patient.dto";
import { AuthenticatedRequest } from "@/types/requests";
import { UserRole } from "@/roles/roles.entity";

@Controller()
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Get("patient-appointment")
    async getAllPatientAppointment(@Req() request: AuthenticatedRequest) {
        return await this.patientsService.getCurrentPatientAllAppointment(
            request.user,
        );
    }

    @Post("create-patient-appointment")
    @Roles(UserRole.Patient)
    async createPatientAppointment(@Body() dto: CreatePatientAppointmentDto) {
        return await this.patientsService.createPatientAppointment(dto);
    }

    @Post("patient-info")
    @Roles(UserRole.Doctor, UserRole.Admin)
    async updatePatientInfo(@Body() dto: CreateAndUpdatePatientDto) {}
}
