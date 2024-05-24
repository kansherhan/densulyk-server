import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "@/users/users.module";
import { UserToken } from "@/users/models/user-tokens.model";
import { UserAuthHistory } from "@/tasks/models/user-auth-history.model";
import { ContractsModule } from "@/contracts/contracts.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        ContractsModule,
        SequelizeModule.forFeature([UserToken, UserAuthHistory]),
    ],
})
export class AuthModule {}
