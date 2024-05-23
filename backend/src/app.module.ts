import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { CreateDatabaseModule } from "@/database.module";
import { CreateRouterModule } from "@/router";
import { CreateMailerModule } from "@/mailer.module";
import { CreateStaticFileModule } from "@/static-file.module";

import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { PatientsModule } from "@/patients/patients.module";
import { DoctorsModule } from "@/doctors/doctors.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
    providers: [],
    controllers: [],
    imports: [
        ScheduleModule.forRoot(),
        CreateStaticFileModule(),
        CreateMailerModule(),
        CreateDatabaseModule(),
        CreateRouterModule(),

        AuthModule,
        UsersModule,
        PatientsModule,
        DoctorsModule,
        TasksModule,
    ],
})
export class AppModule {}
