import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { Role } from "@/roles/roles.model";

export interface UserCreationAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    emailVerified: boolean;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleID: number;

    @BelongsTo(() => Role)
    role: Role;
}
