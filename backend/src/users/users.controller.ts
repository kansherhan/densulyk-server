import { Controller, Get, Param, ParseIntPipe, Req } from "@nestjs/common";

import { UsersService } from "./users.service";

import { Roles } from "@/roles/decorators/roles-auth.decorator";
import { UserRole } from "@/roles/roles.entity";

import { AuthenticatedRequest } from "@/types/requests";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("me")
    async getCurrentUser(@Req() request: AuthenticatedRequest) {
        return await this.usersService.getCurrentUser(request.user);
    }

    @Get(":id")
    @Roles(UserRole.Admin, UserRole.Patient)
    async getUser(@Param("id", ParseIntPipe) userID: number) {
        return await this.usersService.getUserByID(userID);
    }
}
