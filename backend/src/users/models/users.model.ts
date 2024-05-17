import { Model, Table, Column, DataType, HasOne } from "sequelize-typescript";

import { Doctor } from "@/doctors/models/doctors.model";
import { UserRole } from "@/roles/roles.entity";

export interface UserCreationAttributes {
    firstName: string;
    lastName: string;

    email: string;
    password: string;

    inn: string;
    birthdate: Date | string;
    gender: boolean;
    address: string;
}

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model<User, UserCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    inn: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    birthdate: Date;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    gender: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    emailVerified: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: UserRole.Patient,
    })
    roleID: number;

    @HasOne(() => Doctor)
    doctor: Doctor;
}
