import { NestFactory, Reflector } from "@nestjs/core";

import { AppModule } from "./app.module";

import { AuthGuard } from "./auth/guards/auth.guard";

import { UsersService } from "./users/users.service";

import { RequestValidationPipe } from "./pipes/request-validation.pipe";

(async () => {
    const app = await NestFactory.create(AppModule);

    app.useGlobalGuards(
        new AuthGuard(app.get(UsersService), app.get(Reflector)),
    );

    app.useGlobalPipes(new RequestValidationPipe());

    app.enableCors();

    await app.listen(process.env.BACKEND_PORT, "0.0.0.0", () => {
        console.log(`Сервер запустилься на порту ${process.env.BACKEND_PORT}!`);
    });
})();
