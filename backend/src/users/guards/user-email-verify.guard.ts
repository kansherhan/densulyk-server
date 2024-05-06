import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { AuthenticatedRequest } from "@/types/requests";

import { User } from "@/users/models/users.model";
import { EmailNotVerifyException } from "@/users/exceptions/email-not-verify.exception";

@Injectable()
export class UserEmailVerifyGuard implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();

        const user: User = request.user;

        if (!user) {
            return true;
        }

        if (user.emailVerified === false) {
            throw new EmailNotVerifyException();
        }

        return true;
    }
}
