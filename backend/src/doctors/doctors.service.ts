import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "@/users/models/users.model";
import { Doctor } from "@/doctors/models/doctors.model";

import { UserRole } from "@/roles/roles.entity";

import { CreateDoctorDto } from "@/doctors/dto/create-doctor.dto";

import { UserRoleNotPatientException } from "@/doctors/exceptions/user-role-not-patient.exception";
import { UserNotFoundException } from "@/users/exceptions/user-not-found.exception";
import { PatientAppointment } from "@/patients/models/patient-appointments.model";

@Injectable()
export class DoctorsService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,

        @InjectModel(Doctor)
        private readonly doctorModel: typeof Doctor,

        @InjectModel(PatientAppointment)
        private readonly patientAppointmentModel: typeof PatientAppointment,
    ) {}

    async getAllDoctors(): Promise<User[]> {
        return await this.userModel.findAll({
            where: {
                roleID: UserRole.Doctor,
            },
            include: Doctor,
            attributes: {
                exclude: ["password"],
            },
        });
    }

    async createDoctor(dto: CreateDoctorDto) {
        const user = await this.userModel.findOne({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new UserNotFoundException();
        }

        if (user.roleID !== UserRole.Patient) {
            throw new UserRoleNotPatientException();
        }

        user.roleID = UserRole.Doctor;
        await user.save();

        return await this.doctorModel.create({
            userID: user.id,
            speciality: dto.speciality,
        });
    }

    async getDoctorPatientAppointments(user: User) {
        return await this.patientAppointmentModel.findAll({
            where: {
                doctorID: user.id,
                isMeeted: false,
            },
            include: { all: true },
        });
    }

    async getAllPatientAppointment() {
        return await this.patientAppointmentModel.findAll({
            include: { all: true },
        });
    }
}
