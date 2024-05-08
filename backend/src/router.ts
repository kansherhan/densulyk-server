import { RouterModule } from "@nestjs/core";
import { DynamicModule } from "@nestjs/common";

import { UsersModule } from "@/users/users.module";
import { AuthModule } from "@/auth/auth.module";
import { PatientsModule } from "@/patients/patients.module";

export const CreateRouterModule = (): DynamicModule => {
    return RouterModule.register([
        {
            path: "api",
            children: [
                {
                    path: "auth",
                    module: AuthModule,
                },
                {
                    path: "users",
                    module: UsersModule,
                },
                {
                    path: "patients",
                    module: PatientsModule,
                },
            ],
        },
    ]);
};
