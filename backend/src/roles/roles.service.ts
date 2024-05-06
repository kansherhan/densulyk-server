import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Role } from "./roles.model";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}

    async getAllRoles(): Promise<Role[]> {
        return await this.roleModel.findAll();
    }

    async getRoleByID(roleID: number) {
        return await this.roleModel.findOne({
            where: {
                id: roleID,
            },
        });
    }
}
