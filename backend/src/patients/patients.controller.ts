import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthenticatedRequest } from "@/types/requests";

import { UserRole } from "@/roles/roles.entity";
import { Roles } from "@/roles/decorators/roles-auth.decorator";

import { PatientsService } from "@/patients/patients.service";

import { CreatePatientAppointmentDto } from "@/patients/dto/create-patient-appointment.dto";
import { CreatePatientDiagnosticDto } from "@/patients/dto/create-patient-diagnostic.dto";
import { UpdatePatientDiagnosticDto } from "@/patients/dto/update-patient-diagnostic.dto";
import { diskStorage } from "multer";
import { extname } from "path";

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

    @Post("toggle-patient-appointment-meet/:appointmentID")
    @Roles(UserRole.Doctor, UserRole.Admin)
    async togglePatientAppointmentMeet(
        @Param("appointmentID", ParseIntPipe) appointmentID: number,
    ) {
        return await this.patientsService.togglePatientAppointmentMeet(
            appointmentID,
        );
    }

    @Get("patient-all-diagnostic")
    @Roles(UserRole.Patient)
    async getAllPatientDiagnostic(@Req() request: AuthenticatedRequest) {
        return await this.patientsService.getAllPatientDiagnostic(request.user);
    }

    @Post("create-diagnostic")
    @Roles(UserRole.Doctor)
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join("");
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async createPatientDiagnostic(
        @Req() request: AuthenticatedRequest,
        @Body() dto: CreatePatientDiagnosticDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException("Файл не найден");
        }

        return await this.patientsService.createPatientDiagnostic(
            request.user,
            dto,
            file,
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
