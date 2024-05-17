import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { User } from "@/users/models/users.model";

export interface PatientDiagnosticCreationAttributes {
    userID: number;
    doctorID: number;
    diagnosisName: string;
    recommendation: string;
}

@Table({
    tableName: "patientDiagnostics",
})
export class PatientDiagnostic extends Model<
    PatientDiagnostic,
    PatientDiagnosticCreationAttributes
> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userID: number;

    @BelongsTo(() => User, "userID")
    user: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    doctorID: number;

    @BelongsTo(() => User, "doctorID")
    doctor: User;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    diagnosisName: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    recommendation: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: false,
    })
    completed: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    documentUrl: string;
}
