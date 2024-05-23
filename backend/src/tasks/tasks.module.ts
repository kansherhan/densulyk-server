import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";

import { UserAuthReport } from "@/tasks/models/user-auth-report.model";
import { UserAuthHistory } from "@/tasks/models/user-auth-history.model";

@Module({
    providers: [TasksService],
    imports: [SequelizeModule.forFeature([UserAuthHistory, UserAuthReport])],
    controllers: [TasksController],
})
export class TasksModule {}
