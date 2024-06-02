import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

import { UserAuthReport } from "@/tasks/models/user-auth-report.model";
import { UserAuthHistory } from "@/tasks/models/user-auth-history.model";

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        @InjectModel(UserAuthHistory)
        private readonly userAuthHistoryModel: typeof UserAuthHistory,

        @InjectModel(UserAuthReport)
        private readonly userAuthReportModel: typeof UserAuthReport,
    ) {}

    @Cron(CronExpression.EVERY_3_HOURS)
    async handleCron() {
        const date = new Date();
        date.setDate(date.getDate() - 1); // 1 day subtract

        const successCount = await this.userAuthHistoryModel.count({
            where: {
                isSuccess: true,
                createdAt: {
                    [Op.gt]: date,
                },
            },
        });

        const errorCount = await this.userAuthHistoryModel.count({
            where: {
                isSuccess: false,
                createdAt: {
                    [Op.gt]: date,
                },
            },
        });

        await this.userAuthReportModel.create({
            successCount,
            errorCount,
        });

        this.logger.debug("Create user auth report");
    }

    async getAllAuthHistoryByDay() {
        const date = new Date();
        date.setDate(date.getDate() - 1); // 1 day subtract

        return await this.userAuthHistoryModel.findAll({
            where: {
                createdAt: {
                    [Op.gt]: date,
                },
            },
        });
    }

    async getWeekStatisticAuthReport() {
        const date = new Date();
        date.setDate(date.getDate() - 7); // 1 week subtract

        return await this.userAuthReportModel.findAll({
            where: {
                createdAt: {
                    [Op.gt]: date,
                },
            },
        });
    }
}
