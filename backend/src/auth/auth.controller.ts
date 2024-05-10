import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegistrationDto } from "./dto/auth-registration.dto";

import { AllowUnauthorizedRequest } from "@/auth/decorators/allow-unauthorized-request.decorator";

import { UserToken } from "@/users/models/user-tokens.model";
import { AuthEmailVerifyDto } from "@/auth/dto/auth-email-verify.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @AllowUnauthorizedRequest()
    async login(@Body() dto: AuthLoginDto): Promise<UserToken> {
        return await this.authService.login(dto);
    }

    @Post("registration")
    @AllowUnauthorizedRequest()
    async registration(@Body() dto: AuthRegistrationDto): Promise<UserToken> {
        return await this.authService.registration(dto);
    }

    @Post("email-verify")
    @AllowUnauthorizedRequest()
    async emailVerify(@Body() dto: AuthEmailVerifyDto): Promise<void> {
        return await this.authService.emailVerify(dto);
    }
}
