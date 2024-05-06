import { Module } from "@nestjs/common";

import { CreateDatabaseModule } from "./database.module";
import { CreateRouterModule } from "./router";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "@/roles/roles.module";

@Module({
    providers: [],
    controllers: [],
    imports: [
        CreateDatabaseModule(),
        CreateRouterModule(),

        AuthModule,
        UsersModule,
        RolesModule,
    ],
})
export class AppModule {}
