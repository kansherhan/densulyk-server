import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Req,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";

import { UsersService } from "./users.service";

import { UpdateUserDto } from "./dto/update-user.dto";

import { AuthenticatedRequest } from "@/types/requests";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("me")
    async getCurrentUser(@Req() user: AuthenticatedRequest) {
        return user.user;
    }

    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) userID: number) {
        return await this.usersService.getUserByID(userID);
    }

    @Patch()
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateUser(
        @Req() request: AuthenticatedRequest,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.updateCurrentUser(
            request.user,
            updateUserDto,
        );
    }
}
