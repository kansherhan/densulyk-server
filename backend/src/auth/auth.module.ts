import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "@/users/users.module";
import { UserToken } from "@/users/models/user-tokens.model";
import { UserAuthHistory } from "@/tasks/models/user-auth-history.model";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        SequelizeModule.forFeature([UserToken, UserAuthHistory]),
    ],
})
export class AuthModule {}
