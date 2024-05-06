import { Module } from "@nestjs/common";

import { CreateDatabaseModule } from "./database.module";
import { CreateRouterModule } from "./router";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "@/roles/roles.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    providers: [],
    controllers: [],
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.BACKEND_MAIL_HOST,
                auth: {
                    user: process.env.BACKEND_MAIL_USER,
                    pass: process.env.BACKEND_MAIL_PASSWORD,
                },
            },
        }),
        CreateDatabaseModule(),
        CreateRouterModule(),

        AuthModule,
        UsersModule,
        RolesModule,
    ],
})
export class AppModule {}
