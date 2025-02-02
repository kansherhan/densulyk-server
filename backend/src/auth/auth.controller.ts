import { Body, Controller, Post, Req } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegistrationDto } from "./dto/auth-registration.dto";

import { AllowUnauthorizedRequest } from "@/auth/decorators/allow-unauthorized-request.decorator";

import { UserToken } from "@/users/models/user-tokens.model";
import { AuthEmailVerifyDto } from "@/auth/dto/auth-email-verify.dto";
import { AuthenticatedRequest } from "@/types/requests";
import { IAuth2FAResponse } from "@/auth/responses/Auth2FA.response";
import { Auth2FAVerifyDto } from "@/auth/dto/auth-2fa-verify.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login2FAVerify")
    @AllowUnauthorizedRequest()
    async login2FAVerify(@Body() dto: Auth2FAVerifyDto) {
        return await this.authService.login2FAVerify(dto);
    }

    @Post("login")
    @AllowUnauthorizedRequest()
    async login(
        @Req() request: AuthenticatedRequest,
        @Body() dto: AuthLoginDto,
    ): Promise<UserToken> {
        return await this.authService.login(request, dto);
    }

    @Post("registration")
    @AllowUnauthorizedRequest()
    async registration(@Body() dto: AuthRegistrationDto): Promise<UserToken> {
        return await this.authService.registration(dto);
    }

    @Post("email-verify")
    @AllowUnauthorizedRequest()
    async emailVerify(
        @Body() dto: AuthEmailVerifyDto,
    ): Promise<IAuth2FAResponse> {
        return await this.authService.emailVerify(dto);
    }
}
