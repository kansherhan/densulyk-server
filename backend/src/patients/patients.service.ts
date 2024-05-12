import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreatePatientAppointmentDto } from "@/patients/dto/create-patient-appointment.dto";
import { CreateAndUpdatePatientDto } from "@/patients/dto/create-and-update-patient.dto";

import { Patient } from "./models/patients.model";
import { PatientDiagnostic } from "./models/patient-diagnostics.model";
import { PatientAppointment } from "./models/patient-appointments.model";
import { CreatePatientDiagnosticDto } from "@/patients/dto/create-patient-diagnostic.dto";
import { UpdatePatientDiagnosticDto } from "@/patients/dto/update-patient-diagnostic.dto";
import { User } from "@/users/models/users.model";
import { Doctor } from "@/doctors/models/doctors.model";
import { PatientDiagnosticNotFoundException } from "@/patients/exceptions/PatientDiagnosticNotFound.exception";

@Injectable()
export class PatientsService {
    constructor(
        @InjectModel(Patient)
        private readonly patientModel: typeof Patient,

        @InjectModel(PatientDiagnostic)
        private readonly patientDiagnosticModel: typeof PatientDiagnostic,

        @InjectModel(PatientAppointment)
        private readonly patientAppointmentModel: typeof PatientAppointment,
    ) {}

    async createPatientAppointment(
        patient: User,
        dto: CreatePatientAppointmentDto,
    ): Promise<PatientAppointment> {
        return await this.patientAppointmentModel.create({
            userID: patient.id,
            ...dto,
        });
    }

    async getCurrentPatientAllAppointment(patient: User) {
        return await this.patientAppointmentModel.findAll({
            where: {
                userID: patient.id,
            },
            include: [
                {
                    model: User,
                    as: "doctor",
                    include: [
                        {
                            model: Doctor,
                            attributes: ["speciality"],
                        },
                    ],
                    attributes: ["id", "firstName", "lastName"],
                },
            ],
        });
    }

    async updatePatientInfo(dto: CreateAndUpdatePatientDto): Promise<Patient> {
        const patient = await this.patientModel.findOne({
            where: {
                userID: dto.userID,
            },
        });

        if (patient) {
            await patient.update(dto);
            await patient.save();

            return patient;
        } else {
            return await this.patientModel.create(dto);
        }
    }

    async getAllPatientDiagnostic(patient: User) {
        return await this.patientDiagnosticModel.findAll({
            where: {
                userID: patient.id,
            },
            include: [
                {
                    model: User,
                    as: "doctor",
                    include: [
                        {
                            model: Doctor,
                            attributes: ["speciality"],
                        },
                    ],
                    attributes: ["id", "firstName", "lastName"],
                },
            ],
        });
    }

    async createPatientDiagnostic(
        doctor: User,
        dto: CreatePatientDiagnosticDto,
    ): Promise<PatientDiagnostic> {
        return await this.patientDiagnosticModel.create({
            doctorID: doctor.id,
            ...dto,
        });
    }

    async updatePatientDiagnostic(
        diagnosticID: number,
        dto: UpdatePatientDiagnosticDto,
    ): Promise<PatientDiagnostic> {
        const diagnostic = await this.patientDiagnosticModel.findOne({
            where: {
                id: diagnosticID,
            },
        });

        if (diagnostic) {
            await diagnostic.update(dto);
            await diagnostic.save();

            return diagnostic;
        } else {
            throw new PatientDiagnosticNotFoundException();
        }
    }
}
