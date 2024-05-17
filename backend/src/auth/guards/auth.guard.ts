import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { UsersService } from "@/users/users.service";

import { AuthenticatedRequest } from "@/types/requests";

import { ALLOW_UNAUTHORIZED_REQUEST } from "@/auth/decorators/allow-unauthorized-request.decorator";

import { UnauthorizedException } from "@/auth/exceptions/unauthorized.exception";

import { UserToken } from "@/users/models/user-tokens.model";
import { ProblemWithAuthorizationTokensException } from "@/auth/exceptions/problem-with-authorization-tokens.exception";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UsersService,
        private readonly reflector: Reflector,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const allowedNotAuthorized: boolean = this.reflector.get<boolean>(
            ALLOW_UNAUTHORIZED_REQUEST,
            context.getHandler(),
        );

        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();

        if (allowedNotAuthorized) {
            request.allowUnauthorizedRequest = true;
            return true;
        }

        const userAccessToken = AuthGuard.validateAuthorizationHeader(
            request.headers.authorization,
        );

        const userToken: UserToken = await this.userService.getUserByAPIToken(
            userAccessToken,
        );

        if (userToken) {
            request.user = userToken.user;

            return true;
        } else {
            throw new ProblemWithAuthorizationTokensException();
        }
    }

    private static validateAuthorizationHeader(
        authorizationHeader: string,
    ): string {
        if (authorizationHeader) {
            const [authType, token] = authorizationHeader.split(" ");

            if (authType === "Bearer" || token) {
                return token;
            }
        }

        throw new UnauthorizedException();
    }
}
