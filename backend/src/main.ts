import { NestFactory, Reflector } from "@nestjs/core";

import { AppModule } from "./app.module";

import { AuthGuard } from "./auth/guards/auth.guard";
import { UserEmailVerifyGuard } from "@/users/guards/user-email-verify.guard";

import { UsersService } from "./users/users.service";

import { RequestValidationPipe } from "./pipes/request-validation.pipe";
import { RolesGuard } from "@/roles/guards/roles.guard";

(async () => {
    const app = await NestFactory.create(AppModule);

    app.useGlobalGuards(
        new AuthGuard(app.get(UsersService), app.get(Reflector)),
        new UserEmailVerifyGuard(),
        new RolesGuard(app.get(Reflector)),
    );

    app.useGlobalPipes(new RequestValidationPipe());

    app.enableCors();

    await app.listen(process.env.BACKEND_PORT, "0.0.0.0", () => {
        console.log(`Сервер запускается на порту ${process.env.BACKEND_PORT}!`);
    });
})();
