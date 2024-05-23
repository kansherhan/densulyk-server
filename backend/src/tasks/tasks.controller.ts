import { Controller, Get } from "@nestjs/common";
import { Roles } from "@/roles/decorators/roles-auth.decorator";
import { UserRole } from "@/roles/roles.entity";
import { TasksService } from "@/tasks/tasks.service";

@Controller()
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get("all-auth-history-day")
    @Roles(UserRole.Admin)
    async getAllAuthHistoryByDay() {
        return await this.tasksService.getAllAuthHistoryByDay();
    }

    @Get("week-statistic-auth-report")
    @Roles(UserRole.Admin)
    async getWeekStatisticAuthReport() {
        return await this.tasksService.getWeekStatisticAuthReport();
    }
}
