import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

import { RolesService } from "./roles.service";

@Controller()
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    async getAllRoles() {
        return await this.rolesService.getAllRoles();
    }

    @Get(":id")
    async getRoleByID(@Param("id", ParseIntPipe) roleID: number) {
        return await this.rolesService.getRoleByID(roleID);
    }
}
