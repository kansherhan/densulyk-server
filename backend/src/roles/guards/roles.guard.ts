import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "../decorators/roles-auth.decorator";
import { AuthenticatedRequest } from "@/types/requests";
import { UnauthorizedException } from "@/auth/exceptions/unauthorized.exception";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(
                ROLES_KEY,
                [context.getHandler(), context.getClass()],
            );

            if (!requiredRoles) {
                return true;
            }

            const request = context
                .switchToHttp()
                .getRequest<AuthenticatedRequest>();

            if (!request.user) {
                throw new UnauthorizedException();
            }

            return requiredRoles.some(
                (role) => request.user.role.name === role,
            );
        } catch (error) {
            console.log(error);
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
        }
    }
}
