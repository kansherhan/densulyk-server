import { MailerModule } from "@nestjs-modules/mailer";

export const CreateMailerModule = () => {
    return MailerModule.forRoot({
        transport: {
            host: process.env.BACKEND_MAIL_HOST,
            auth: {
                user: process.env.BACKEND_MAIL_USER,
                pass: process.env.BACKEND_MAIL_PASSWORD,
            },
        },
    });
};
