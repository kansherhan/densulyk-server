import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { User } from "@/users/models/users.model";

export interface UserTokenCreationAttributes {
    userID: number;
    token: string;
}

@Table({
    tableName: "userTokens",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
})
export class UserToken extends Model<UserToken, UserTokenCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    userID: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    token: string;

    @BelongsTo(() => User)
    user: User;
}
