import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { User } from "@/users/models/users.model";

export interface PatientAppointmentCreationAttributes {
    userID: number;
    doctorID: number;
    date: string | Date;
    user_comment: string;
}

@Table({
    tableName: "patientAppointments",
    updatedAt: false,
})
export class PatientAppointment extends Model<
    PatientAppointment,
    PatientAppointmentCreationAttributes
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
        type: DataType.DATE,
        allowNull: false,
    })
    date: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    user_comment: string;
}
