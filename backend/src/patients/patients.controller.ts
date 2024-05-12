import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
} from "@nestjs/common";

import { AuthenticatedRequest } from "@/types/requests";

import { UserRole } from "@/roles/roles.entity";
import { Roles } from "@/roles/decorators/roles-auth.decorator";

import { PatientsService } from "@/patients/patients.service";

import { CreateAndUpdatePatientDto } from "@/patients/dto/create-and-update-patient.dto";
import { CreatePatientAppointmentDto } from "@/patients/dto/create-patient-appointment.dto";
import { CreatePatientDiagnosticDto } from "@/patients/dto/create-patient-diagnostic.dto";
import { UpdatePatientDiagnosticDto } from "@/patients/dto/update-patient-diagnostic.dto";

@Controller()
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Get("patient-all-appointment")
    @Roles(UserRole.Patient)
    async getAllPatientAppointment(@Req() request: AuthenticatedRequest) {
        return await this.patientsService.getCurrentPatientAllAppointment(
            request.user,
        );
    }

    @Post("create-patient-appointment")
    @Roles(UserRole.Patient)
    async createPatientAppointment(
        @Req() request: AuthenticatedRequest,
        @Body() dto: CreatePatientAppointmentDto,
    ) {
        return await this.patientsService.createPatientAppointment(
            request.user,
            dto,
        );
    }

    @Get("patient-info")
    @Roles(UserRole.Patient)
    async getCurrentPatientInfo(@Req() request: AuthenticatedRequest) {
        return request.user.patient;
    }

    @Post("patient-info")
    @Roles(UserRole.Doctor, UserRole.Admin)
    async updatePatientInfo(@Body() dto: CreateAndUpdatePatientDto) {
        return await this.patientsService.updatePatientInfo(dto);
    }

    @Get("patient-all-diagnostic")
    @Roles(UserRole.Patient)
    async getAllPatientDiagnostic(@Req() request: AuthenticatedRequest) {
        return await this.patientsService.getAllPatientDiagnostic(request.user);
    }

    @Post("create-diagnostic")
    @Roles(UserRole.Doctor)
    async createPatientDiagnostic(
        @Req() request: AuthenticatedRequest,
        @Body() dto: CreatePatientDiagnosticDto,
    ) {
        return await this.patientsService.createPatientDiagnostic(
            request.user,
            dto,
        );
    }

    @Post("update-diagnostic/:id")
    @Roles(UserRole.Doctor, UserRole.Admin)
    async updatePatientDiagnostic(
        @Param("id", ParseIntPipe) diagnosticID: number,
        @Body() dto: UpdatePatientDiagnosticDto,
    ) {
        return await this.patientsService.updatePatientDiagnostic(
            diagnosticID,
            dto,
        );
    }
}
