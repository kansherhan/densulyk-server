import { DynamicModule } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "@/users/models/users.model";
import { UserToken } from "@/users/models/user-tokens.model";
import { UserEmailVerification } from "@/users/models/user-email-verifications.model";

import { PatientDiagnostic } from "@/patients/models/patient-diagnostics.model";
import { PatientAppointment } from "@/patients/models/patient-appointments.model";

import { Doctor } from "@/doctors/models/doctors.model";

export const CreateDatabaseModule = (): DynamicModule => {
    return SequelizeModule.forRoot({
        dialect: "postgres",

        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),

        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: false,

        models: [
            User,
            UserToken,
            UserEmailVerification,

            PatientDiagnostic,
            PatientAppointment,

            Doctor,
        ],
    });
};
