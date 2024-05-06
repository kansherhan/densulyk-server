import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

import { User } from "./models/users.model";
import { UserToken } from "@/users/models/user-tokens.model";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User, UserToken])],
    exports: [UsersService],
})
export class UsersModule {}
