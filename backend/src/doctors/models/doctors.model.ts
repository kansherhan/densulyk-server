import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
} from "sequelize-typescript";
import { User } from "@/users/models/users.model";

export interface DoctorCreationAttributes {
    userID: number;
    speciality: string;
}

export class DoctorModel extends Model<DoctorModel, DoctorCreationAttributes> {
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
    speciality: string;
}
