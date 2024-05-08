import { Body, Controller, Post, Req } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegistrationDto } from "./dto/auth-registration.dto";

import { AllowUnauthorizedRequest } from "@/auth/decorators/allow-unauthorized-request.decorator";

import { UserToken } from "@/users/models/user-tokens.model";
import { AuthEmailVerifyDto } from "@/auth/dto/auth-email-verify.dto";
import { AuthenticatedRequest } from "@/types/requests";

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
    async emailVerify(
        @Req() request: AuthenticatedRequest,
        @Body() dto: AuthEmailVerifyDto,
    ): Promise<void> {
        return await this.authService.emailVerify(request.user, dto);
    }
}
