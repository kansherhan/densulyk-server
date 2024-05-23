import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface UserAuthReportCreationAttributes {
    successCount: number;
    errorCount: number;
}

@Table({
    tableName: "userAuthReport",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
})
export class UserAuthReport extends Model<
    UserAuthReport,
    UserAuthReportCreationAttributes
> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    successCount: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    errorCount: number;
}
