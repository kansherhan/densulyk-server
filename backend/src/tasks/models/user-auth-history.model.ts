import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { User } from "@/users/models/users.model";

export interface UserAuthHistoryCreationAttributes {
    ip: string;
    userID: number;
    isSuccess: boolean;
}

@Table({
    tableName: "userAuthHistory",
    timestamps: true,
    createdAt: true,
    updatedAt: false,
})
export class UserAuthHistory extends Model<
    UserAuthHistory,
    UserAuthHistoryCreationAttributes
> {
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
    ip: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isSuccess: boolean;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userID: number;

    @BelongsTo(() => User, "userID")
    user: User;
}
