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
    diagnosis_name: string;
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

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    doctorID: number;

    @BelongsTo(() => User)
    doctor: User;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    diagnosis_name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    recommendation: string;
}
