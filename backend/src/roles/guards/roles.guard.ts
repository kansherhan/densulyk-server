import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "../decorators/roles-auth.decorator";
import { AuthenticatedRequest } from "@/types/requests";
import { UnauthorizedException } from "@/auth/exceptions/unauthorized.exception";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<number[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();

        if (!request.user) {
            throw new UnauthorizedException();
        }

        return requiredRoles.some((role) => request.user.roleID === role);
    }
}
