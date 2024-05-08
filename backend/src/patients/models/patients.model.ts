import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { User } from "@/users/models/users.model";

export interface PatientCreationAttributes {
    userID: number;
    address: string;
    phone: string;
    gender: boolean;
    height: number;
    whole: number;
}

@Table({
    tableName: "patients",
})
export class Patient extends Model<Patient, PatientCreationAttributes> {
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    gender: boolean;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    height: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    whole: number;
}
