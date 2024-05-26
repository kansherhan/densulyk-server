import { Body, Controller, Get, Post, Req } from "@nestjs/common";

import { DoctorsService } from "@/doctors/doctors.service";
import { CreateDoctorDto } from "@/doctors/dto/create-doctor.dto";
import { Roles } from "@/roles/decorators/roles-auth.decorator";
import { UserRole } from "@/roles/roles.entity";
import { AuthenticatedRequest } from "@/types/requests";

@Controller()
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) {}

    @Get("all-doctors")
    async getAllDoctors() {
        return await this.doctorsService.getAllDoctors();
    }

    @Post("create-doctor")
    @Roles(UserRole.Admin)
    async createDoctor(@Body() dto: CreateDoctorDto) {
        return await this.doctorsService.createDoctor(dto);
    }

    @Get("get-doctor-patient-appointments")
    @Roles(UserRole.Doctor)
    async getDoctorPatientAppointments(@Req() request: AuthenticatedRequest) {
        return await this.doctorsService.getDoctorPatientAppointments(
            request.user,
        );
    }

    @Get("get-all-appointments")
    @Roles(UserRole.Admin)
    async getAllPatientAppointment() {
        return await this.doctorsService.getAllPatientAppointment();
    }
}
