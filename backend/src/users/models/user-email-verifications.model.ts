import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { User } from "./users.model";

export interface UserEmailVerificationCreationAttributes {
    userID: number;
    code: number;
}

@Table({
    tableName: "userEmailVerifications",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
})
export class UserEmailVerification extends Model<
    UserEmailVerification,
    UserEmailVerificationCreationAttributes
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

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    code: number;
}
