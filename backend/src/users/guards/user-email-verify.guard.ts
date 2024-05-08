import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { AuthenticatedRequest } from "@/types/requests";

import { EmailNotVerifyException } from "@/users/exceptions/email-not-verify.exception";

@Injectable()
export class UserEmailVerifyGuard implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();

        const user = request.user;

        if (request.allowUnauthorizedRequest) {
            return true;
        }

        if (user.emailVerified === false) {
            throw new EmailNotVerifyException();
        }

        return true;
    }
}
